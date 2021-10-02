import { Logger, NotFoundException } from '@nestjs/common';
import { Baguettes } from 'capabilities/baguettes';
import { BaguetteNotFoundError } from 'exceptions/baguette-not-found';
import { Baguette } from 'resources/baguette/baguette';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateBaguette } from 'validators/baguette/createBaguette';
import { UpdateBaguette } from 'validators/baguette/updateBaguette';

export class BaguetteService {
  constructor(private readonly baguettes: Baguettes) {}
  private readonly logger = new Logger();

  async deleteBaguette(id: number): Promise<DeleteResult> {
    this.logger.debug('Service deleteBaguette() id - ' + id);
    return await this.baguettes.deleteEntity(id).then((result) => {
      if (result.affected) {
        this.logger.debug('Specified baguette deleted');
        return result;
      }
      throw new BaguetteNotFoundError();
    });
  }

  async updateBaguette(id: number | number[], baguette: UpdateBaguette): Promise<UpdateResult> {
    this.logger.debug('Service updateBaguette() id - ' + id, baguette);
    return await this.baguettes.updateEntity(id, baguette).then((result) => {
      if (result.affected) {
        this.logger.debug('Specified baguette updated');
        return result;
      }
      throw new BaguetteNotFoundError();
    });
  }

  async createBaguette(baguette: CreateBaguette): Promise<Baguette> {
    this.logger.debug('Service createBaguette()');
    return await this.baguettes.createEntity(baguette);
  }

  async findOneBaguette(id: number): Promise<Baguette> {
    this.logger.debug('Service findOneBaguette() id - ' + id);
    return await this.baguettes.findOneEntity(id).then((result) => {
      if (result) {
        this.logger.debug('Baguettes found!');
        return result;
      }
      throw new BaguetteNotFoundError();
    });
  }

  async findAllBaguettes(): Promise<Baguette[]> {
    this.logger.debug('Service findAllBaguettes()');
    return await this.baguettes.findAllEntities();
  }
}
