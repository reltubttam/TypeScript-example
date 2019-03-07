import { Request, Response, Errback, NextFunction } from 'express';

export interface IReq extends Request {
  // add properties set by middleware here
}

export interface IRes extends Response {
  // add properties set by middleware here
}

export interface INext extends NextFunction {}
