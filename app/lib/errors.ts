import { Error as MongooseError } from 'mongoose';

export interface IServerError extends Error {
  statusCode?: number;
  description?: string;
}

export function makeUnknownRouteError(route: string) {
  const unknownRouteError:IServerError  = new Error('UNKNOWN_ROUTE');
  unknownRouteError.statusCode = 404;
  unknownRouteError.description = `route: ${route}`;
  return unknownRouteError;
}

export function makeDatabaseError(error: MongooseError, collectionName: string) {
  const databaseError:IServerError = new Error(error.message);
  databaseError.statusCode = 500;
  databaseError.description = `collection: ${collectionName}`;
  return databaseError;
}
