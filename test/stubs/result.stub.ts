import { DeleteResult, UpdateResult } from 'typeorm';

const getUpdateResult = (): UpdateResult => {
  return Object.assign(new UpdateResult(), {
    generatedMaps: [],
    raw: [],
    affected: 1,
  });
};

const getNoUpdateResult = (): UpdateResult => {
  return Object.assign(new UpdateResult(), {
    generatedMaps: [],
    raw: [],
    affected: 0,
  });
};

const getDeleteResult = (): DeleteResult => {
  return Object.assign(new DeleteResult(), {
    raw: [],
    affected: 1,
  });
};

const getNoDeleteResult = (): DeleteResult => {
  return Object.assign(new DeleteResult(), {
    raw: [],
    affected: 0,
  });
};

export { getNoDeleteResult, getDeleteResult, getUpdateResult, getNoUpdateResult };
