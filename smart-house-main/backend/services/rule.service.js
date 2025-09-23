import Rule from '../models/rule.model.js';

export const getAllRules = () => Rule.find().populate('targetDevice');
export const getRuleById = id => Rule.findById(id).populate('targetDevice');
export const createRule = data => new Rule(data).save();
export const updateRule = (id, data) => Rule.findByIdAndUpdate(id, data, { new: true }).populate('targetDevice');
export const deleteRule = id => Rule.findByIdAndDelete(id);