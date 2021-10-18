import { ApiProperty } from '@nestjs/swagger';
import { Baguette } from 'resources/baguette';

export class Cart {
  @ApiProperty({ type: Baguette, isArray: true })
  baguettes?: Baguette[];
}
