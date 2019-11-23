import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import randomId from '../models/database/identity';
require('../models/database/user')();
import db from '../models/database/index';
import { validateSignup } from '../models/validators/userSignup';
import { validateLogin } from '../models/validators/userLogin';

class UserController {
  static async createUserAccount(req, res) {
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const {
      firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
    } = req.body;

    const identity = randomId(1000000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (user.rowCount > 0) {
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'User already registered',
        },
      });
    }

    user = await db.query(
      `INSERT INTO users (userId, firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [identity, firstName, lastName, email, hashedPassword, gender, jobRole, department, address, isAdmin],
    );

    const token = jwt.sign({
      userId: identity,
      isAdmin,
      email,
    }, 'jwtPrivateKey');
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'User account successfully created',
        token,
        userId: identity,
      },
    });
  }

  static async loginUser(req, res) {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({
      userId: user.rows[0].userId,
      isAdmin: user.rows[0].isAdmin,
      email: user.rows[0].email,
    }, 'jwtPrivateKey');
    return res.status(201).json({
      status: 'success',
      data: {
        token,
        userId: user.rows[0].userId,
      },
    });
  }
}

module.exports = UserController;