import { Logger } from '@nestjs/common';
import { Baguettes } from 'capabilities/baguettes';
import { Carts, CreateCart, UpdateCart } from 'capabilities/carts';
import { Users } from 'capabilities/users';
import { CartWithBaguettes, CartWithUserAndBaguettes } from 'models/carts';

export class CartService {
  constructor(private readonly carts: Carts, private readonly baguettes: Baguettes, private readonly users: Users) {}
  private readonly logger = new Logger();

  async deleteCart(id: number): Promise<void> {
    this.logger.debug('Service deleteCart() id - ' + id);

    await this.carts.deleteEntity(id);
  }

  async updateCart(id: number, cart: UpdateCart): Promise<CartWithBaguettes> {
    this.logger.debug('Service updateCart() id - ' + id, cart);
    const baguettesToCart = await this.baguettes.findManyByIds(cart.baguetteIds);

    return await this.carts.updateEntity(id, baguettesToCart);
  }

  async createCart(cart: CreateCart): Promise<CartWithBaguettes> {
    this.logger.debug('Service createCart()');
    const baguettesToCart = await this.baguettes.findManyByIds(cart.baguetteIds);
    const user = await this.users.findOneEntity(cart.userId);

    return await this.carts.createEntity(cart, baguettesToCart, user);
  }

  async findOneCart(id: number): Promise<CartWithBaguettes> {
    this.logger.debug('Service findOneCart() id - ' + id);
    return await this.carts.findOneEntity(id);
  }

  async findAllCarts(): Promise<CartWithUserAndBaguettes[]> {
    this.logger.debug('Service findAllCarts()');

    return await this.carts.findAllEntities();
  }
}
