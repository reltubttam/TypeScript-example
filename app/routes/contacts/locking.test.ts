import {
  lock,
  unlock,
} from './locking';
import { IReq, IRes, INext } from '../../types/express';

const TEST_CONTACT = { TEST: true };
const findOneAndUpdateMock = jest.fn(async (...args) => TEST_CONTACT);

jest.mock('../../db/models/contacts', () => ({
  Contact: {
    findOneAndUpdate: async (...args) => findOneAndUpdateMock(...args),
  },
}));

const req: IReq = {
  params: { _id: 'ID' },
  version: 1,
} as any;
const res: IRes = {
  status: jest.fn(() => res),
  send: jest.fn(),
} as any;
const next: INext = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('locking', () => {
  it('updates records', async () => {
    await lock(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(findOneAndUpdateMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contact: TEST_CONTACT,
      ok: true,
      v: 1,
    });
  });
});

describe('unlocking', () => {
  it('updates records', async () => {
    await unlock(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(findOneAndUpdateMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contact: TEST_CONTACT,
      ok: true,
      v: 1,
    });
  });
});
