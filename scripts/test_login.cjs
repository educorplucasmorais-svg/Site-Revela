const { createTRPCProxyClient, httpBatchLink } = require('@trpc/client');
const fetch = require('node-fetch'); // You might need to install this or use global fetch if node version supports it
// Polyfill fetch for node environment if needed, or just use axios/http. 
// Since we are in a script, let's use raw fetch or axios if available. 
// Actually, let's just use a simple fetch implementation or axios since we have axios installed.
const axios = require('axios');

async function run() {
    const PORT = process.env.PORT || 3000;
    const BASE_URL = `http://localhost:${PORT}/api/trpc`;

    console.log(`Testing login on ${BASE_URL}...`);

    try {
        // 1. Login
        console.log('1. Attempting Login...');
        // tRPC batch format: ?batch=1&input={"0":{"username":"admin","password":"admin123"}}
        // But for mutation it's a POST.
        // tRPC POST body: { "0": { "username": "admin", "password": "admin123" } }
        
        const loginRes = await axios.post(`${BASE_URL}/auth.login`, {
            username: 'admin',
            password: 'admin123'
        });
        
        // tRPC returns { result: { data: ... } }
        const loginData = loginRes.data.result.data;
        console.log('Login Response:', JSON.stringify(loginData, null, 2));

        if (!loginData.token) {
            console.error('Login failed: No token returned');
            process.exit(1);
        }

        const token = loginData.token;
        console.log('Token received:', token);

        // 2. Whoami (Query)
        console.log('\n2. Checking Whoami...');
        const whoamiRes = await axios.get(`${BASE_URL}/auth.whoami`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const whoamiData = whoamiRes.data.result.data;
        console.log('Whoami Response:', JSON.stringify(whoamiData, null, 2));

        if (whoamiData.email !== 'admin@revela.local') {
             console.error('Whoami failed: Unexpected email');
        }

        // 3. Logout
        console.log('\n3. Logging out...');
        await axios.post(`${BASE_URL}/auth.logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Logout successful');

        // 4. Verify Whoami is null
        console.log('\n4. Verifying session cleared...');
        const verifyRes = await axios.get(`${BASE_URL}/auth.whoami`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const verifyData = verifyRes.data.result.data;
        console.log('Whoami after logout:', verifyData);

        if (verifyData === null) {
            console.log('SUCCESS: Login flow verified.');
        } else {
            console.error('FAILURE: Session still active after logout.');
        }

    } catch (e) {
        console.error('Error during test:', e.response?.data || e.message);
        process.exit(1);
    }
}

run();
