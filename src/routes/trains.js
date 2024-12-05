import { Router } from 'express';
import { getAllTrains, getTrainSchedule, checkAvailability } from '../controllers/trainController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllTrains);
router.get('/:trainId/schedule', getTrainSchedule);
router.get('/:trainId/availability/:date', authenticate, checkAvailability);

export default router;