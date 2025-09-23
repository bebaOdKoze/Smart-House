import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  time: Date,
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  message: String,
  type: String, 
  severity: String
});

export default mongoose.model('Log', logSchema);