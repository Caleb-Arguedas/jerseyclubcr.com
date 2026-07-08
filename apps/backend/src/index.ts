import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { initializeDatabaseSchema } from './database/schema';
import { errorHandler } from './middleware/errorHandler';

import productRoutes from './routes/products';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
initializeDatabaseSchema().catch((err) => {
  console.error('Error initializing database:', err);
  process.exit(1);
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`);
});

export default app;
