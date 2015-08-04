import express from 'express';
import assign from 'object-assign';
import db from './db';

const router = express.Router();

const col = db.get().collection('cards');
const cardFilter = {
  type: { '$in': ['weapon', 'minion', 'spell'] },
  set: { '$nin': ['Debug', 'Credits'] }
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

router.get('/:search', (req, res) => {
  col.find(assign({}, cardFilter,
    {
      name: { '$regex': new RegExp(`^.*${req.params.search}.*$`, 'i') }
    }
  )).sort({ name: 1 })
    .toArray((err, cards) => {
      if (err)
        return error(res, err);
      res.json(cards);
    });
});

export default router;