import app from './app';

const PORT = process.env.PORT || 3060;

// Only start a listener in non-serverless environments
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
  });
}

export default app;
