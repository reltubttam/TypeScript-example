import { Request, Response, Errback, NextFunction } from 'express';

export interface IReq extends Request {
  version?: number;
}

export interface IRes extends Response {}

export interface INext extends NextFunction {}
