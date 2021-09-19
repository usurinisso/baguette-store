import { INestApplication } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaguettesConditionTask } from 'domain/scheduler/baguettesCondition.task';
import { Baguette } from 'entities/baguette.entity';
import { BaguettesRepositoryAccesPoint } from 'repositories/baguettes.repository';
import { BaguettesService } from 'services/baguettes.service';
import { Repository } from 'typeorm';

describe('Cron', () => {
  let app: INestApplication;
  let baguettesRepository: Repository<Baguette>;

  beforeEach(async () => {
    jest.clearAllTimers();
    const moduleRef = await Test.createTestingModule({
      imports: [ScheduleModule.forRoot()],
      providers: [
        BaguettesConditionTask,
        BaguettesService,
        {
          provide: getRepositoryToken(Baguette),
          useClass: Repository,
        },
        BaguettesRepositoryAccesPoint,
      ],
    }).compile();
    baguettesRepository = moduleRef.get<Repository<Baguette>>(getRepositoryToken(Baguette));
    app = moduleRef.createNestApplication();
    jest.useFakeTimers();
    await app.init();
  });

  it(`should schedule "cron"`, async () => {
    const timeInMiliSeconds = 6 * 60 * 60 * 1000;

    const cronFunc = jest.spyOn(baguettesRepository, 'find');
    jest.advanceTimersByTime(timeInMiliSeconds);

    expect(cronFunc).toHaveBeenCalledTimes(3);
  });

  afterEach(async () => {
    await app.close();
  });
});
