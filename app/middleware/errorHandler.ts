import { IReq, IRes, INext } from '../types/express';
import { IServerError } from '../lib/errors';
import * as logger from '../lib/logger';

export default function (err: IServerError, req: IReq, res: IRes, next: INext) {
  logger.error(err.message);

  res.status(err.statusCode || 500).send({
    message: err.message,
    description: err.description,
    ok: false,
  });
}
