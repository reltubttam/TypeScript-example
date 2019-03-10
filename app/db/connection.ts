import mongoose from 'mongoose';
import { MONGO_URL } from '../config';
import * as logger from '../lib/logger';

logger.info(`connecting to MONGO_URL: ${MONGO_URL}`);
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  autoReconnect: true,
}).then(() => logger.info(`connected to MONGO_URL: ${MONGO_URL}`));

export default mongoose;
