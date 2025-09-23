import Log from '../models/log.model.js';

export const getAllLogs = () => Log.find().populate('device');
export const getLogById = id => Log.findById(id).populate('device');
export const createLog = data => new Log(data).save();
export const deleteLog = id => Log.findByIdAndDelete(id);