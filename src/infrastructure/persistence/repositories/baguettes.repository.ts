import { Baguettes } from 'capabilities/baguettes';
import { BaguetteNotFoundError } from 'exceptions/baguette-not-found';
import { FullBaguette } from 'models/baguette';
import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateBaguette } from 'validators/baguette/createBaguette';
import { UpdateBaguette } from 'validators/baguette/updateBaguette';

import { Baguette } from '../entities/baguette.entity';

@EntityRepository(Baguette)
export class BaguetteRepository extends Repository<Baguette> implements Baguettes {
  async findAllEntities(): Promise<FullBaguette[]> {
    return await this.find();
  }

  async findOneEntity(id: number): Promise<FullBaguette> {
    const baguette = await this.findOne(id);

    if (!baguette) {
      throw new BaguetteNotFoundError();
    }
    return baguette;
  }

  async createEntity(baguette: CreateBaguette): Promise<FullBaguette> {
    return await this.save(baguette);
  }

  async updateEntity(id: number | number[], baguette: UpdateBaguette): Promise<UpdateResult> {
    return await this.update(id, baguette);
  }

  async deleteEntity(id: number): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
