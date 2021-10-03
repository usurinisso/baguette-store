import { Logger } from '@nestjs/common';
import { Baguettes } from 'capabilities/baguettes';
import { FullBaguette } from 'models/baguette';
import { Baguette } from 'resources/baguette/baguette';
import { CreateBaguette } from 'validators/baguette/createBaguette';
import { UpdateBaguette } from 'validators/baguette/updateBaguette';

export class BaguetteService {
  constructor(private readonly baguettes: Baguettes) {}
  private readonly logger = new Logger();

  async deleteBaguette(id: number): Promise<void> {
    this.logger.debug('Service deleteBaguette() id - ' + id);
    await this.baguettes.deleteEntity(id);
  }

  async updateBaguette(id: number | number[], baguette: UpdateBaguette): Promise<FullBaguette> {
    this.logger.debug('Service updateBaguette() id - ' + id, baguette);
    return await this.baguettes.updateEntity(id, baguette);
  }

  async createBaguette(baguette: CreateBaguette): Promise<Baguette> {
    this.logger.debug('Service createBaguette()');
    return await this.baguettes.createEntity(baguette);
  }

  async findOneBaguette(id: number): Promise<Baguette> {
    this.logger.debug('Service findOneBaguette() id - ' + id);
    return await this.baguettes.findOneEntity(id);
  }

  async findAllBaguettes(): Promise<Baguette[]> {
    this.logger.debug('Service findAllBaguettes()');
    return await this.baguettes.findAllEntities();
  }
}
