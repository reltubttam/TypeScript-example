import express from 'express';
import {
  create,
  list,
  get,
  update,
  del,
} from './crud';
import {
  lock,
  unlock,
} from './locking';

const router = express.Router();
router.post('/', create);
router.get('/', list);
router.get('/:_id', get);
router.put('/:_id', update);
router.delete('/:_id', del);
router.get('/:_id/lock', lock);
router.get('/:_id/unlock', unlock);

export default router;
