import { IReq, IRes } from '../types/express';

export default (req: IReq, res: IRes)  => res.status(200).send('ready');
