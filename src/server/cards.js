import express from 'express';
import db from './db';

const router = express.Router();

const col = db.get().collection('cards');
const cardFilter = {
  type: { '$in': ['weapon', 'minion', 'spell'] },
  set: { '$ne': 'Debug' }
};

function error(res, err) {
  return res.status(500)
            .json({
              error: err.message
            });
}

router.get('/', (req, res) => {
  col.find(cardFilter)
    .sort({ name: 1 })
    .toArray((err, cards) => {
      if (err)
        return error(res, err);
      res.json(cards);
    });
});

export default router;