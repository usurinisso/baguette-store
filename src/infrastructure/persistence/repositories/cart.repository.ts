import { Carts, CreateCart } from 'capabilities/carts';
import { CartNotFoundError } from 'exceptions/cart-not-found';
import { Cart } from 'infrastructure/persistence/entities/cart.entity';
import { BaguetteWithCartsAndShopAndOrder, FullBaguette } from 'models/baguette';
import { CartWithBaguettes, CartWithUserAndBaguettes } from 'models/carts';
import { FullUser } from 'models/users';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> implements Carts {
  async findOneEntity(id: number): Promise<CartWithBaguettes> {
    const entity = await this.findOne({ where: { id }, relations: ['baguettes'] });

    if (!entity) {
      throw new CartNotFoundError();
    }

    console.log(entity);

    return entity as unknown as CartWithBaguettes;
  }

  async createEntity(createEntity: CreateCart, baguettes: FullBaguette[], user: FullUser): Promise<CartWithBaguettes> {
    return (await this.save(new Cart(user, baguettes))) as unknown as CartWithBaguettes;
  }

  async findAllEntities(): Promise<CartWithUserAndBaguettes[]> {
    return (await this.find({ relations: ['baguettes', 'user'] })) as unknown as CartWithUserAndBaguettes[];
  }

  async updateEntity(id: number, baguettes: FullBaguette[]): Promise<CartWithBaguettes> {
    const entityToUpdate = await this.findOne({ where: { id }, relations: ['baguettes'] });

    if (!entityToUpdate) {
      throw new CartNotFoundError();
    }

    entityToUpdate.baguettes = baguettes ?? entityToUpdate.baguettes;

    await this.save(entityToUpdate);

    return (await this.findOne({ where: { id }, relations: ['baguettes'] })) as unknown as CartWithBaguettes;
  }

  async deleteEntity(id: number): Promise<void> {
    const entityToDelete = await this.findOne(id);

    if (!entityToDelete) {
      throw new CartNotFoundError();
    }

    await this.delete(id);
  }
}
