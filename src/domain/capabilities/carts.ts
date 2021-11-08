import { BaguetteWithShop } from 'models/baguette';
import { CartWithUser, CartWithUserAndBaguettes } from 'models/carts';
import { FullUser } from 'models/users';

export interface Carts {
  findOneEntity(id: number): Promise<CartWithUserAndBaguettes>;

  createEntity(
    createEntity: CreateCart,
    baguettes: BaguetteWithShop[],
    user: FullUser,
  ): Promise<CartWithUserAndBaguettes>;

  findAllEntities(): Promise<CartWithUser[]>;

  updateEntity(id: number, baguettes: BaguetteWithShop[]): Promise<CartWithUserAndBaguettes>;

  deleteEntity(id: number): Promise<void>;
}

export interface CreateCart {
  userId: number;

  baguetteIds: number[];
}

export interface UpdateCart {
  baguetteIds: number[];
}
