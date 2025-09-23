import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  name: String,
  type: String,
  condition: String,
  action: String,
  targetDevice: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  status: String,
  priority: String,
  lastTriggered: Date,
  createdBy: String,
  icon: String
});

export default mongoose.model('Rule', ruleSchema);