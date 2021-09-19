import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaguettesController } from 'api/controllers/baguettes.controller';
import { BaguettesConditionTask } from 'domain/scheduler/baguettesCondition.task';
import { BaguettesService } from 'domain/services/baguettes.service';
import { AllExceptionsFilter } from 'handlers/all-exceptions.filter';
import { Baguette } from 'persistence/entities/baguette.entity';
import { BaguettesRepositoryAccesPoint } from 'persistence/repositories/baguettes.repository';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Baguette]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    BaguettesService,
    BaguettesRepositoryAccesPoint,
    BaguettesConditionTask,
  ],
  controllers: [BaguettesController],
})
export class AppModule {}
