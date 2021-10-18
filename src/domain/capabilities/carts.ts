import { BaguetteWithCartsAndShopAndOrder } from 'models/baguette';
import { CartWithBaguettes, CartWithUserAndBaguettes } from 'models/carts';
import { UserWithCartAndOrders } from 'models/users';

export interface Carts {
  findOneEntity(id: number): Promise<CartWithBaguettes>;

  createEntity(
    createEntity: CreateCart,
    baguettes: BaguetteWithCartsAndShopAndOrder[],
    user: UserWithCartAndOrders,
  ): Promise<CartWithBaguettes>;

  findAllEntities(): Promise<CartWithUserAndBaguettes[]>;

  updateEntity(id: number, baguettes: BaguetteWithCartsAndShopAndOrder[]): Promise<CartWithBaguettes>;

  deleteEntity(id: number): Promise<void>;
}

export interface CreateCart {
  userId: number;

  baguetteIds: number[];
}

export interface UpdateCart {
  baguetteIds: number[];
}
