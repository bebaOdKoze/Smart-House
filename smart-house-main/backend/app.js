import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import deviceRoutes from './routes/device.routes.js';
import ruleRoutes from './routes/rule.routes.js';
import logRoutes from './routes/log.routes.js';
import authRoutes from './routes/auth.routes.js';
import { MONGO_URI } from './config.js';



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/devices', deviceRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
