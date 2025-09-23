import * as service from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    const user = await service.register(username, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await service.login(username, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};