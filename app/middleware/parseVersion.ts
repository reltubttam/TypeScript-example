import { IReq, IRes, INext } from '../types/express';

export default function (req: IReq, res: IRes, next: INext) {
  req.version = parseInt(req.params.version, 10) || null;
  next();
}
