import express from 'express';
import * as ctrl from '../controllers/rule.controller.js';

const router = express.Router();
router.get('/', ctrl.fetchRules);
router.get('/:id', ctrl.fetchRule);
router.post('/', ctrl.addRule);
router.put('/:id', ctrl.modifyRule);
router.delete('/:id', ctrl.removeRule);
export default router;
