import { Document, Schema, Model } from 'mongoose';
import connection from '../connection';
import { IContact } from '../../types/models';
import { CONTACT_COLLECTION_NAME } from '../../constants';

export interface ContactModel extends IContact, Document {
  fullName(): string;
}

export const ContactSchema: Schema = new Schema({
  firstName: String,
  job: String,
  isMale: Boolean,
  age: Number,
});

export const Contact: Model<ContactModel> = connection.model<ContactModel>(
  CONTACT_COLLECTION_NAME,
  ContactSchema,
);
