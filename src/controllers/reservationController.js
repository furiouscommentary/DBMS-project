import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  try {
    const ticketId = await Reservation.create({
      ...req.body,
      passengerId: req.user.id
    });
    res.status(201).json({ ticketId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getByPassenger(req.user.id);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};