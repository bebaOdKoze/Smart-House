import express from 'express';
import * as ctrl from '../controllers/device.controller.js';

const router = express.Router();
router.get('/', ctrl.fetchDevices);
router.get('/:id', ctrl.fetchDevice);
router.post('/', ctrl.addDevice);
router.put('/:id', ctrl.modifyDevice);
router.delete('/:id', ctrl.removeDevice);

export default router;
