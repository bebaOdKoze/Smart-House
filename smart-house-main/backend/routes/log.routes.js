import express from 'express';
import * as ctrl from '../controllers/log.controller.js';

const router = express.Router();
router.get('/', ctrl.fetchLogs);
router.get('/:id', ctrl.fetchLog);
router.post('/', ctrl.addLog);
router.delete('/:id', ctrl.removeLog);

export default router;
