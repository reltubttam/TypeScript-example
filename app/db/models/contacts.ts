import { Document, Schema, Model } from 'mongoose';
import connection from '../connection';
import { IContact } from '../../types/models';
import { CONTACT_COLLECTION_NAME } from '../../constants';

export interface ContactModel extends IContact, Document {}

export const ContactSchema: Schema = new Schema({
  name: String,
  lastName: String,
  job: String,
  isMale: Boolean,
  age: Number,
  lockUntil: Date,
});

export const Contact: Model<ContactModel> = connection.model<ContactModel>(
  CONTACT_COLLECTION_NAME,
  ContactSchema,
);
