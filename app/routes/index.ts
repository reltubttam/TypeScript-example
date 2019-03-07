import express from 'express';
import liveness from './liveness';
import readiness from './readiness';
import unknown from './unknown';
import contacts from './contacts';

const router = express.Router();
router.get('/liveness', liveness);
router.get('/readiness', readiness);

router.use('/contacts', contacts);
router.use(unknown);

export default router;
