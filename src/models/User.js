import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export default class User {
  static async create({ p_name, email, password, age, dob, address, phone_no }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO passenger (p_name, email, password, age, dob, address, phone_no) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [p_name, email, hashedPassword, age, dob, address, phone_no]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM passenger WHERE email = ?',
      [email]
    );
    return rows[0];
  }
}