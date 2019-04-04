import { IReq, IRes, INext } from '../../types/express';
import { Contact } from '../../db/models/contacts';
import { makeDatabaseError, makeResourceConflictError } from '../../lib/errors';
import * as logger from '../../lib/logger';

export async function create(req: IReq, res: IRes, next: INext) {
  logger.info(`creating contact ${req.params._id}`);
  try {
    const contact = await Contact.create({
      ...req.body.contact,
      lockUntil: null,
    });
    logger.debug(`created contact ${contact._id}`);
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

export async function list(req: IReq, res: IRes, next: INext) {
  logger.debug('listing contacts');
  try {
    const contacts = await Contact.find({});
    return res.status(200).send({
      contacts,
      v: req.version,
      ok: true,
    });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(dbErr);
  }
}

export async function get(req: IReq, res: IRes, next: INext) {
  logger.debug(`getting contact ${req.params._id}`);
  try {
    const contact = await Contact.findOne({ _id: req.params._id });
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

export async function update(req: IReq, res: IRes, next: INext) {
  logger.info(`updating contact ${req.params._id}`);
  try {
    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params._id,
        $or: [
          { lockUntil: null },
          { lockUntil: { $lt : new Date() } },
        ],
      },
      {
        ...(req.body.contact || {}),
      },
      { new: true },
    );
    if (!contact) {
      return next(makeResourceConflictError('contacts'));
    }
    logger.debug(`updated contact ${contact._id}`);
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

export async function del(req: IReq, res: IRes, next: INext) {
  logger.info(`deleting contact ${req.params._id}`);
  try {
    const contact = await Contact.deleteOne({
      _id: req.params._id,
      $or: [
        { lockUntil: null },
        { lockUntil: { $lt : new Date() } },
      ],
    });
    logger.info(`deleted contact ${req.params._id}`);
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
