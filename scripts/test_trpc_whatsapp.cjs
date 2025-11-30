const axios = require('axios');

async function run() {
  const url = 'http://localhost:3060/api/trpc/sendWhatsapp';
  console.log('Testing WhatsApp mutation at:', url);

  try {
    // Try standard JSON body first
    // tRPC v10 often expects input directly in body for single mutations if not batched?
    // Or it might expect { json: input } if transformer is used?
    // Let's try the batch format which is more reliable if httpBatchLink is default
    
    // Batch format
    const batchUrl = 'http://localhost:3060/api/trpc/sendWhatsapp?batch=1';
    const body = {
        "0": {
            "text": "Teste de integração: Olá do script de teste (tRPC)!",
            "to": "5531993044867" 
        }
    };

    console.log('Sending batch request to:', batchUrl);
    const res = await axios.post(batchUrl, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Status:', res.status);
    console.log('Data:', JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
    if (e.response) {
        console.error('Response Status:', e.response.status);
        console.error('Response Data:', JSON.stringify(e.response.data, null, 2));
    }
  }
}

run();
