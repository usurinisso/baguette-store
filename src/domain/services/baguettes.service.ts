import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BaguetteDto } from 'dto/baguette.dto';
import { CreateBaguetteDto } from 'dto/createBaguette.dto';
import { UpdateBaguetteDto } from 'dto/updateBaguette.dto';
import { DateTime } from 'luxon';
import { BaguettesRepositoryAccesPoint } from 'repositories/baguettes.repository';
import { DeleteResult, LessThanOrEqual, UpdateResult } from 'typeorm';

@Injectable()
export class BaguettesService {
  constructor(private readonly baguettesRepository: BaguettesRepositoryAccesPoint) {}
  private readonly logger = new Logger(BaguettesService.name);

  async deleteBaguette(id: number): Promise<DeleteResult> {
    this.logger.debug('Service deleteBaguette() id - ' + id);
    return await this.baguettesRepository.deleteEntity(id).then((result) => {
      if (result.affected) {
        this.logger.debug('Specified baguette deleted');
        return result;
      }
      throw new NotFoundException('Baguette resource not found');
    });
  }

  async updateBaguette(id: number | number[], baguette: UpdateBaguetteDto): Promise<UpdateResult> {
    this.logger.debug('Service updateBaguette() id - ' + id, baguette);
    return await this.baguettesRepository.updateEntiy(id, baguette).then((result) => {
      if (result.affected) {
        this.logger.debug('Specified baguette updated');
        return result;
      }
      throw new NotFoundException('Baguette resource not found');
    });
  }

  async createBaguette(baguette: CreateBaguetteDto): Promise<BaguetteDto> {
    this.logger.debug('Service createBaguette()');
    return await this.baguettesRepository.createEntity(baguette).then((result) => {
      this.logger.debug('Baguette created!', result);
      return result;
    });
  }

  async findOneBaguette(id: number): Promise<BaguetteDto> {
    this.logger.debug('Service findOneBaguette() id - ' + id);
    return await this.baguettesRepository.findOneEntity(id).then((result) => {
      if (result) {
        this.logger.debug('Baguette found!');
        return result;
      }
      throw new NotFoundException('Baguette resource not found');
    });
  }

  async findAllBaguettes(): Promise<BaguetteDto[]> {
    this.logger.debug('Service findAllBaguettes()');
    return await this.baguettesRepository.findAllEntities().then((results) => {
      this.logger.debug('Baguettes found!');
      return results;
    });
  }

  async createOrReplace(id: number, baguette: CreateBaguetteDto): Promise<BaguetteDto> {
    const newBaguette = Object.assign(new BaguetteDto(), { ...baguette, ...{ id: id } });
    return await this.baguettesRepository.createEntity(newBaguette);
  }

  async updateCondition(baguettes: BaguetteDto[], condition: number): Promise<UpdateResult> {
    const baguetteIds = baguettes.map((x) => x.id);
    return await this.baguettesRepository.updateEntiy(baguetteIds, { ...new UpdateBaguetteDto(), condition });
  }

  async findBaguettesOlderThan(date: DateTime, condition: number): Promise<BaguetteDto[]> {
    const toDate = date.toJSDate();
    this.logger.debug('Repository find()\nWHERE bakedAt <= ' + toDate.toISOString() + '\nAND\ncondition ' + condition);
    return await this.baguettesRepository.findSpecificEntity({
      where: {
        bakedAt: LessThanOrEqual(toDate),
        condition: condition,
      },
    });
  }
}
