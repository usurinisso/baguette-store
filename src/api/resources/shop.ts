import { ApiProperty } from '@nestjs/swagger';

export class Shop {
  @ApiProperty({ type: String, example: 'Vilniaus g. 35 - 71, Kaunas' })
  address: string;

  @ApiProperty({ type: String, example: '+370677772777' })
  phone: string;

  @ApiProperty({ type: String, example: '09:00 - 17:00' })
  workHours: string;

  @ApiProperty({ type: String, example: 'https://cdn.pixabay.com/photo/2013/07/13/11/31/shop-158317_960_720.png' })
  shopImage: string;
}
