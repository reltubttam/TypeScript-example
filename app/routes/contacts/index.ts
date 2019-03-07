import express from 'express';
import {
  create,
  list,
  get,
  update,
  del,
} from './crud';

const router = express.Router();
router.post('/', create);
router.get('/', list);
router.get('/:_id', get);
router.put('/:_id', update);
router.delete('/:_id', del);

export default router;
