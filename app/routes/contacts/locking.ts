import moment from 'moment';
import { IReq, IRes, INext } from '../../types/express';
import { Contact } from '../../db/models/contacts';
import { makeDatabaseError, makeResourceConflictError } from '../../lib/errors';
import { CONTACT_COLLECTION_LOCK_MS } from '../../constants';
import * as logger from '../../lib/logger';

export async function lock(req: IReq, res: IRes, next: INext) {
  logger.info(`updating contact ${req.params._id}`);
  try {
    const lockUntil = moment().add(CONTACT_COLLECTION_LOCK_MS, 'milliseconds').toDate();
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params._id },
      { lockUntil },
      { new: true },
    );
    res.status(200);

    if (!contact) {
      return next(makeResourceConflictError('contacts'));
    }

    return res.status(200).send({
      contact,
      v: req.version,
      ok: true,
    });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(dbErr);
  }
}

export async function unlock(req: IReq, res: IRes, next: INext) {
  logger.info(`updating contact ${req.params._id}`);
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params._id },
      { lockUntil: null },
      { new: true },
    );

    if (!contact) {
      return next(makeResourceConflictError('contacts'));
    }

    return res.status(200).send({
      contact,
      v: req.version,
      ok: true,
    });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(dbErr);
  }
}
