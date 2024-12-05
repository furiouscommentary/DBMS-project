import { Router } from 'express';
import { createReservation, getMyReservations } from '../controllers/reservationController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);
router.post('/', createReservation);
router.get('/my-reservations', getMyReservations);

export default router;