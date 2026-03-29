import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (global)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running correctly.' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;