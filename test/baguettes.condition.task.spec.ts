import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaguettesConditionTask } from 'domain/scheduler/baguettesCondition.task';
import { Baguette } from 'entities/baguette.entity';
import { BaguettesRepositoryAccesPoint } from 'repositories/baguettes.repository';
import { Repository } from 'typeorm';

import { BaguettesController } from '../src/api/controllers/baguettes.controller';
import { BaguettesService } from '../src/domain/services/baguettes.service';
import { getBaguette } from './stubs/baguette.stub';
import { getUpdateResult } from './stubs/result.stub';

describe('BaguettesService', () => {
  let baguettesRepository: Repository<Baguette>;
  let baguettesTask: BaguettesConditionTask;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BaguettesController],
      providers: [
        BaguettesService,
        BaguettesRepositoryAccesPoint,
        {
          provide: getRepositoryToken(Baguette),
          useClass: Repository,
        },
        BaguettesConditionTask,
      ],
    }).compile();

    baguettesRepository = moduleRef.get<Repository<Baguette>>(getRepositoryToken(Baguette));
    baguettesTask = moduleRef.get<BaguettesConditionTask>(BaguettesConditionTask);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(BaguettesConditionTask).toBeDefined();
  });

  it('should try to handle cron task with all baguettes matching', () => {
    const repositoryFindMock = jest
      .spyOn(baguettesRepository, 'find')
      .mockImplementationOnce(() => Promise.resolve([getBaguette()]))
      .mockImplementationOnce(() => Promise.resolve([{ ...getBaguette(), ...{ condition: 2 } }]))
      .mockImplementationOnce(() => Promise.resolve([{ ...getBaguette(), ...{ condition: 3 } }]));
    const repositoryUpdateMock = jest
      .spyOn(baguettesRepository, 'update')
      .mockImplementation(() => Promise.resolve(getUpdateResult()));

    baguettesTask.handleCron().then(() => {
      expect(repositoryFindMock).toHaveBeenCalledTimes(3);
      expect(repositoryUpdateMock).toHaveBeenCalledTimes(3);
    });
  });

  it('should try to handle cron task without any baguettes matching and returning undefined', () => {
    const repositoryFindMock = jest
      .spyOn(baguettesRepository, 'find')
      .mockImplementation(() => Promise.resolve(undefined));

    baguettesTask.handleCron().then(() => {
      expect(repositoryFindMock).toHaveBeenCalledTimes(3);
    });
  });

  it('should try to handle cron task without any baguettes matching', () => {
    const repositoryFindMock = jest.spyOn(baguettesRepository, 'find').mockImplementation(() => Promise.resolve([]));

    baguettesTask.handleCron().then(() => {
      expect(repositoryFindMock).toHaveBeenCalledTimes(3);
    });
  });
});
