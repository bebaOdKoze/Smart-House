import * as service from '../services/device.service.js';

export const fetchDevices = async (req, res) => res.json(await service.getAllDevices());
export const fetchDevice = async (req, res) => res.json(await service.getDeviceById(req.params.id));
export const addDevice = async (req, res) => res.status(201).json(await service.createDevice(req.body));
export const modifyDevice = async (req, res) => res.json(await service.updateDevice(req.params.id, req.body));
export const removeDevice = async (req, res) => {
  await service.deleteDevice(req.params.id);
  res.status(204).end();
};
