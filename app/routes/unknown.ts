import { makeUnknownRouteError } from '../lib/errors';
import { IReq, IRes , INext } from '../types/express';

export default (req: IReq, res: IRes, next: INext)  => {
  const unknownRouteError = makeUnknownRouteError(req.originalUrl);
  return next(unknownRouteError);
};
