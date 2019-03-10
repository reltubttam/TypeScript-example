import moment from 'moment';
import { IReq, IRes, INext } from '../../types/express';
import { Contact } from '../../db/models/contacts';
import { makeDatabaseError, makeResourceConflictError } from '../../lib/errors';
import { CONTACT_COLLECTION_LOCK_MS } from '../../constants';
import * as logger from '../../lib/logger';

export async function create(req: IReq, res: IRes, next: INext) {
  try {
    const contact = await Contact.create({
      ...req.body.contact,
      lockUntil: null,
    });
    logger.info(`created contact ${contact._id}`);
    return res.status(200).send({
      contact,
      version: req.version,
      ok: true,
    });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(dbErr);
  }
}

export async function list(req: IReq, res: IRes, next: INext) {
  try {
    const contacts = await Contact.find({});
    return res.status(200).send({
      contacts,
      version: req.version,
      ok: true,
    });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(dbErr);
  }
}

export async function get(req: IReq, res: IRes, next: INext) {
  try {
    const contact = await Contact.findOne({ _id: req.params._id });
    return res.status(200).send({ contact,
      version: req.version,
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
    const lockUntil = moment().add(CONTACT_COLLECTION_LOCK_MS, 'milliseconds').toDate();
    const lockedContact = await Contact.findOneAndUpdate(
      {
        _id: req.params._id,
        $or: [
          { lockUntil: null },
          { lockUntil: { $lt : new Date() } },
        ],
      },
      { lockUntil },
      { new: true },
    );

    if (!lockedContact) {
      return next(makeResourceConflictError('contacts'));
    }

    await Contact.updateOne(
      { _id: req.params._id },
      { ...req.body.contact, lockUntil },
    );

    const unlockedContact = await Contact.findOneAndUpdate(
      { _id: req.params._id },
      { lockUntil: null },
      { new: true },
    );

    return res.status(200).send({ contact: unlockedContact,
      version: req.version,
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
    const lockUntil = moment().add(CONTACT_COLLECTION_LOCK_MS, 'milliseconds').toDate();
    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params._id,
        $or: [
          { lockUntil: null },
          { lockUntil: { $lt : new Date() } },
        ],
      },
      { lockUntil },
      { new: true },
    );
    if (!contact) {
      return next(makeResourceConflictError('contacts'));
    }

    await Contact.deleteOne({ _id: req.params._id });

    return res.status(200).send({ contact, v: req.version });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(dbErr);
  }
}
