import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: String,
  location: String,
  battery: Number,
  powerUsage: Number,
  vendor: String,
  lastActive: Date,
  icon: String,
  ip: String,
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
  rules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule' }]
});

export default mongoose.model('Device', deviceSchema);