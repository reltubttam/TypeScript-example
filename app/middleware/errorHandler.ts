import { IReq, IRes, INext } from '../types/express';
import { IServerError } from '../lib/errors';
export default function (err: IServerError, req: IReq, res: IRes, next: INext) {
  res.status(err.statusCode || 500).send({
    message: err.message,
    ok: false,
  });
}
