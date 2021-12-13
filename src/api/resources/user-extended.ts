import { ApiProperty } from '@nestjs/swagger';
import { UserWithCartAndOrders } from 'models/users';
import { Cart } from 'resources/cart';
import { Order } from 'resources/order';
import { User } from 'resources/user';
import { RoleType } from 'types/roleType';
export class UserExtended extends User {
  @ApiProperty({ type: Cart })
  cart?: Cart;

  @ApiProperty({ type: Order, isArray: true })
  orders?: Order[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    roleType: RoleType,
    cart?: Cart,
    orders?: Order[],
  ) {
    super(id, firstName, lastName, userName, roleType);
    this.cart = cart;
    this.orders = orders;
  }

  public static from(user: UserWithCartAndOrders): UserExtended {
    return new UserExtended(user.id, user.firstName, user.lastName, user.userName, user.role, user.cart, user.orders);
  }
}
