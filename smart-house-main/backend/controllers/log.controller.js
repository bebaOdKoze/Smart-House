import * as service from '../services/log.service.js';

export const fetchLogs = async (req, res) => res.json(await service.getAllLogs());
export const fetchLog = async (req, res) => res.json(await service.getLogById(req.params.id));
export const addLog = async (req, res) => res.status(201).json(await service.createLog(req.body));
export const removeLog = async (req, res) => {
  await service.deleteLog(req.params.id);
  res.status(204).end();
};