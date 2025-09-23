import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const SECRET = process.env.JWT_SECRET || 'dev_secret';

export const register = async (username, password) => {
  const existing = await User.findOne({ username });
  if (existing) throw new Error('Username already taken');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash });
  return user;
};

export const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
  return { token, user };
};