import express from 'express';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import helmet from './middleware/helmet';
import { PORT } from './constants';
import * as logger from './lib/logger';

const app = express();

app.use(express.json());
app.use(helmet);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`listening on port: ${PORT}`));
