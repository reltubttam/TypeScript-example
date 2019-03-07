import { IReq, IRes, INext } from '../../types/express';
import { Contact } from '../../db/models/contacts';
import { makeDatabaseError } from '../../lib/errors';

export async function create(req: IReq, res: IRes, next: INext) {
  try {
    const contact = await Contact.create(req.body.contact);
    return res.status(200).send({ contact });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(err);
  }
}

export async function list(req: IReq, res: IRes, next: INext) {
  try {
    const contacts = await Contact.find({});
    return res.status(200).send({ contacts });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(err);
  }
}

export async function get(req: IReq, res: IRes, next: INext) {
  try {
    const contact = await Contact.findOne({ _id: req.params._id });
    return res.status(200).send({ contact });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(err);
  }
}

export async function update(req: IReq, res: IRes, next: INext) {
  try {
    await Contact.updateOne({ _id: req.params._id }, req.body.contact);
    const contact = await Contact.findOne({ _id: req.params._id });
    return res.status(200).send({ contact });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(err);
  }
}

export async function del(req: IReq, res: IRes, next: INext) {
  try {
    const contact = await Contact.findOne({ _id: req.params._id });
    await Contact.deleteOne({ _id: req.params._id });
    return res.status(200).send({ contact });
  } catch (err) {
    const dbErr = makeDatabaseError(err, 'contacts');
    return next(err);
  }
}
