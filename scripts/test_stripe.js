require('dotenv').config();
const Stripe = require('stripe');

async function main() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('Missing STRIPE_SECRET_KEY in environment');
    process.exit(1);
  }

  const stripe = new Stripe(key, { apiVersion: '2023-10-16' });

  try {
    const amount = process.env.TEST_AMOUNT ? parseInt(process.env.TEST_AMOUNT, 10) : 1000; // cents
    const currency = process.env.TEST_CURRENCY || 'brl';

    const pi = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      description: 'Site-Revela test PaymentIntent',
    });

    console.log('PaymentIntent created:');
    console.log('id:', pi.id);
    console.log('client_secret:', pi.client_secret);
    console.log('status:', pi.status);
  } catch (err) {
    console.error('Stripe error:', err);
    process.exit(1);
  }
}

main();
