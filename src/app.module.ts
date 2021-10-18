import { Abstract, FactoryProvider, Module } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaguettesController } from 'api/controllers/baguettes.controller';
import { CartController } from 'controllers/cart.controller';
import { OrdersController } from 'controllers/order.controller';
import { ShopController } from 'controllers/shop.controller';
import { UsersController } from 'controllers/user.controller';
import { BaguetteRepository } from 'infrastructure/persistence/repositories/baguettes.repository';
import { CartRepository } from 'infrastructure/persistence/repositories/cart.repository';
import { OrderRepository } from 'infrastructure/persistence/repositories/order.repository';
import { ShopRepository } from 'infrastructure/persistence/repositories/shop.repository';
import { UserRepository } from 'infrastructure/persistence/repositories/user.repository';
import { BaguetteService } from 'services/baguette';
import { CartService } from 'services/cart';
import { OrderService } from 'services/order';
import { ShopService } from 'services/shop';
import { UserService } from 'services/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([BaguetteRepository, ShopRepository, CartRepository, UserRepository, OrderRepository]),
  ],
  providers: [
    factory(BaguetteService, [BaguetteRepository, ShopService]),
    factory(ShopService, [ShopRepository]),
    factory(CartService, [CartRepository, BaguetteRepository, UserRepository]),
    factory(OrderService, [OrderRepository, BaguetteRepository, UserRepository]),
    factory(UserService, [UserRepository]),
  ],
  controllers: [ShopController, BaguettesController, UsersController, OrdersController, CartController],
})
export class AppModule {}

// eslint-disable-next-line @typescript-eslint/ban-types
type Deps = Array<Type<unknown> | string | symbol | Abstract<unknown> | Function>;

function factory<T>(Clazz: Type<T>, deps: Deps): FactoryProvider<T> {
  return {
    provide: Clazz,
    useFactory: (...args) => new Clazz(...args),
    inject: deps,
  };
}
