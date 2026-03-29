import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
import cors from "cors";

app.use(cors({
  origin: "https://prop-fish-ai-client.vercel.app",
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running correctly.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
