import { BaguetteWithCartsAndShopAndOrder } from 'models/baguette';
import { FullOrder, OrderWithBaguettes, OrderWithBaguettesAndUser } from 'models/orders';
import { UserWithCartAndOrders } from 'models/users';

export interface Orders {
  findAllEntities(): Promise<OrderWithBaguettesAndUser[]>;

  findOneEntity(id: number): Promise<OrderWithBaguettes>;

  createEntity(
    createEntity: CreateOrder,
    baguettes: BaguetteWithCartsAndShopAndOrder[],
    user: UserWithCartAndOrders,
  ): Promise<OrderWithBaguettes>;

  updateEntity(id: number, updateEntity: UpdateOrder): Promise<FullOrder>;

  deleteEntity(id: number): Promise<void>;
}

export interface CreateOrder {
  userId: number;

  deliveryAddress: string;

  deliveryInfo: string;

  baguetteIds: number[];
}

export interface UpdateOrder {
  deliveryAddress?: string;

  deliveryInfo?: string;

  delivered?: boolean;
}
