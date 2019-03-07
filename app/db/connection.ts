import mongoose from 'mongoose';
import { MONGO_URL } from '../config';

console.log(`connecting to MONGO_URL: ${MONGO_URL}`);
mongoose.connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log(`connected to MONGO_URL: ${MONGO_URL}`));

export default mongoose;
