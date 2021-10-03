import { FullBaguette } from 'models/baguette';
import { CreateBaguette } from 'validators/baguette/createBaguette';
import { UpdateBaguette } from 'validators/baguette/updateBaguette';

export interface Baguettes {
  findAllEntities(): Promise<FullBaguette[]>;

  findOneEntity(id: number): Promise<FullBaguette>;

  createEntity(baguette: CreateBaguette): Promise<FullBaguette>;

  updateEntity(id: number | number[], baguette: UpdateBaguette): Promise<FullBaguette>;

  deleteEntity(id: number): Promise<void>;
}
