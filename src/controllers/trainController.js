import Train from '../models/Train.js';

export const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.getAll();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainSchedule = async (req, res) => {
  try {
    const schedule = await Train.getSchedule(req.params.trainId);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { trainId, date } = req.params;
    const availability = await Train.getAvailableSeats(trainId, date);
    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};