import express from 'express';
import liveness from './liveness';
import unknown from './unknown';
import contacts from './contacts';
import parseVersion from '../middleware/parseVersion';

const router = express.Router();
router.get('/liveness', liveness);

router.use('/:version/\*', parseVersion);
router.use('/:version/contacts', contacts);
router.use(unknown);

export default router;
