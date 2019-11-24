require('../models/database/gifComments')();
import db from '../models/database/index';
import generateId from '../models/database/identity';
import { validate } from '../models/validators/gifComments';

const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

class GifCommentsController {
  static async writeComment(req, res) {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const { comment } = req.body;
    const { gifId } = req.params;
    const createdOn = dateTime;
    const commentId = generateId(5484621);
    const createdBy = req.body.email;

    const gif = await db.query(`SELECT * FROM gifs WHERE gifId = ${gifId}`);
    if (gif.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'gif with the specified ID not found',
      });
    }
    await db.query(
      `INSERT INTO gifs_comments (commentId, comment, createdOn, gifId, createdBy) 
        VALUES ($1, $2, $3, $4, $5)`, [commentId, comment, createdOn, gifId, createdBy],
    );
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Comment Successfully created',
        createdOn,
        gifTitle: gif.rows[0].title,
        comment,
      },
    });
  }
}


module.exports = GifCommentsController;
