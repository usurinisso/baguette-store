import { Baguettes } from 'capabilities/baguettes';
import { BaguetteNotFoundError } from 'exceptions/baguette-not-found';
import { FullBaguette } from 'models/baguette';
import { EntityRepository, Repository } from 'typeorm';
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

  async updateEntity(id: number, baguette: UpdateBaguette): Promise<FullBaguette> {
    const baguetteToUpdate = await this.findOne(id);

    if (!baguetteToUpdate) {
      throw new BaguetteNotFoundError();
    }

    baguetteToUpdate.type = baguette.type ?? baguetteToUpdate.type;
    baguetteToUpdate.price = baguette.price ?? baguetteToUpdate.price;
    baguetteToUpdate.sizeCm = baguette.sizeCm ?? baguetteToUpdate.sizeCm;
    baguetteToUpdate.condition = baguette.condition ?? baguetteToUpdate.condition;

    await this.save(baguetteToUpdate);

    return await this.findOne(id);
  }

  async deleteEntity(id: number): Promise<void> {
    const baguette = await this.findOne(id);

    if (!baguette) {
      throw new BaguetteNotFoundError();
    }

    await this.delete(id);
  }
}
