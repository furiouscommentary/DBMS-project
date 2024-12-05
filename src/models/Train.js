import pool from '../config/database.js';

export default class Train {
  static async getAll() {
    const [rows] = await pool.execute('SELECT * FROM train');
    return rows;
  }

  static async getSchedule(trainId) {
    const [rows] = await pool.execute(
      'SELECT * FROM schedule WHERE train_no = ?',
      [trainId]
    );
    return rows;
  }

  static async getAvailableSeats(trainId, date) {
    const [rows] = await pool.execute(
      'SELECT * FROM train_status WHERE train_no = ? AND date = ?',
      [trainId, date]
    );
    return rows[0];
  }
}