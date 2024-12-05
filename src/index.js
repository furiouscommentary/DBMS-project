import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import trainRoutes from './routes/trains.js';
import reservationRoutes from './routes/reservations.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/reservations', reservationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});