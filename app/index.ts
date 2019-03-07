import express from 'express';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import helmet from './middleware/helmet';

const PORT = 3456;
const app = express();

app.use(express.json());
app.use(helmet);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
