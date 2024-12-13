import express from 'express';
import { config } from './config';
import { authRouter } from './routes/auth';
import { errorHandler } from './middleware/error';
import { initializeDatabase } from './db';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Error handling
app.use(errorHandler);

// Initialize database and start server
async function start() {
  try {
    await initializeDatabase();
    app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();