import pool from '../config/database.js';

export default class Reservation {
  static async create({ passengerId, trainNo, scheduleId, source, destination, date, classType }) {
    const [result] = await pool.execute(
      'INSERT INTO ticket (p_id, train_no, schedule_id, source, destination, date_time, class_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [passengerId, trainNo, scheduleId, source, destination, date, classType]
    );
    return result.insertId;
  }

  static async getByPassenger(passengerId) {
    const [rows] = await pool.execute(
      'SELECT * FROM ticket WHERE p_id = ?',
      [passengerId]
    );
    return rows;
  }
}