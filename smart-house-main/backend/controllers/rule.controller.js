import * as service from '../services/rule.service.js';

export const fetchRules = async (req, res) => res.json(await service.getAllRules());
export const fetchRule = async (req, res) => res.json(await service.getRuleById(req.params.id));
export const addRule = async (req, res) => res.status(201).json(await service.createRule(req.body));
export const modifyRule = async (req, res) => res.json(await service.updateRule(req.params.id, req.body));
export const removeRule = async (req, res) => {
  await service.deleteRule(req.params.id);
  res.status(204).end();
};