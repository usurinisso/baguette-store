import { ApiProperty } from '@nestjs/swagger';
import { Baguette } from 'resources/baguette';

export class Order {
  @ApiProperty({ type: String, example: 'Vilniaus g. 35 - 71, Kaunas' })
  deliveryAddress: string;

  @ApiProperty({ type: String, example: 'Leave in front of the door' })
  deliveryInfo: string;

  // @ApiProperty({ type: Baguette, example: [1, 2], isArray: true })
  // baguettes: Baguette[];

  @ApiProperty({ type: Boolean, example: true })
  delivered: boolean;

  @ApiProperty({ type: Number, example: 36.99 })
  price: number;
}
