import Device from '../models/device.model.js';

export const getAllDevices = () => Device.find().populate('logs').populate('rules');
export const getDeviceById = id => Device.findById(id).populate('logs').populate('rules');
export const createDevice = data => new Device(data).save();
export const updateDevice = (id, data) => Device.findByIdAndUpdate(id, data, { new: true }).populate('logs').populate('rules');
export const deleteDevice = id => Device.findByIdAndDelete(id);