import {
  create,
  list,
  get,
  update,
  del,
} from './crud';
import { IReq, IRes, INext } from '../../types/express';

const TEST_CONTACT = { TEST: true };
const findOneAndUpdateMock = jest.fn(async (...args) => TEST_CONTACT);
const createMock = jest.fn(async (...args) => TEST_CONTACT);
const findMock = jest.fn(async (...args) => [TEST_CONTACT]);
const findOneMock = jest.fn(async (...args) => TEST_CONTACT);
const deleteOneMock = jest.fn(async (...args) => TEST_CONTACT);

jest.mock('../../db/models/contacts', () => ({
  Contact: {
    findOneAndUpdate: async (...args) => findOneAndUpdateMock(...args),
    create: async (...args) => createMock(...args),
    find: async (...args) => findMock(...args),
    findOne: async (...args) => findOneMock(...args),
    deleteOne: async (...args) => deleteOneMock(...args),
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

describe('create', () => {
  it('creates records', async () => {
    const body = { contact: TEST_CONTACT };
    await create({ ...req, body } as IReq, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(createMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contact: TEST_CONTACT,
      ok: true,
      v: 1,
    });
  });
});

describe('list', () => {
  it('lists records', async () => {
    await list(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(findMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contacts: [TEST_CONTACT],
      ok: true,
      v: 1,
    });
  });
});

describe('get', () => {
  it('gets records', async () => {
    await get(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(findOneMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contact: TEST_CONTACT,
      ok: true,
      v: 1,
    });
  });
});

describe('update', () => {
  it('updates records', async () => {
    const body = { contact: TEST_CONTACT };
    await update({ ...req, body } as IReq, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(findOneAndUpdateMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contact: TEST_CONTACT,
      ok: true,
      v: 1,
    });
  });
});

describe('del', () => {
  it('deletes records', async () => {
    await del(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(deleteOneMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      contact: TEST_CONTACT,
      ok: true,
      v: 1,
    });
  });
});
