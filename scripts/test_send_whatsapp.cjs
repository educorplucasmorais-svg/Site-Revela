require('dotenv').config();
const axios = require('axios');

async function run() {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_PHONE;

  if (!token || !phoneId || !to) {
    console.error('Missing WHATSAPP_TOKEN, WHATSAPP_PHONE_ID or WHATSAPP_PHONE in environment');
    process.exit(1);
  }

  const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`;
  try {
    const res = await axios.post(url, {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        preview_url: true,
        body: 'Mensagem de teste enviada via scripts/test_send_whatsapp.cjs',
      }
    }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      timeout: 8000,
    });

    console.log('Success:', JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error('Error sending:', e?.response?.data || e.message || e);
    process.exit(1);
  }
}

run();
