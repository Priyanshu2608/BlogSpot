import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.
connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
  

const app =express();
app.use(cors({
  origin: "http://localhost:5173", // React dev server URL
  credentials: true,              // If using cookies/auth headers
}));
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use('/api/user',UserRoutes);
app.use('/api/auth',authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
  success: false,
  statusCode,
  message
});
});