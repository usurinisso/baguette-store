import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Baguette } from 'entities/baguette.entity';
import { DateTime } from 'luxon';
import { BaguettesRepositoryAccesPoint } from 'repositories/baguettes.repository';
import { Repository } from 'typeorm';

import { BaguettesController } from '../src/api/controllers/baguettes.controller';
import { BaguettesService } from '../src/domain/services/baguettes.service';
import { getBaguette } from './stubs/baguette.stub';
import { getUpdateResult } from './stubs/result.stub';

describe('BaguettesService', () => {
  let baguettesRepository: Repository<Baguette>;
  let baguettesService: BaguettesService;

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
      ],
    }).compile();

    baguettesRepository = moduleRef.get<Repository<Baguette>>(getRepositoryToken(Baguette));
    baguettesService = moduleRef.get<BaguettesService>(BaguettesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(baguettesService).toBeDefined();
  });

  it('should try to update a baguette', () => {
    const returnValue = getUpdateResult();
    const updateBaguettesArray = [getBaguette()];

    jest.spyOn(baguettesRepository, 'update').mockResolvedValueOnce(returnValue);
    const result = baguettesService.updateCondition(updateBaguettesArray, 2);

    return expect(result).resolves.toEqual(returnValue);
  });

  it('should try to update a baguette', () => {
    const returnValue = [getBaguette()];
    const olderBaguettesThan = DateTime.now();

    jest.spyOn(baguettesRepository, 'find').mockResolvedValueOnce(returnValue);
    const result = baguettesService.findBaguettesOlderThan(olderBaguettesThan, 2);

    return expect(result).resolves.toEqual(returnValue);
  });
});
