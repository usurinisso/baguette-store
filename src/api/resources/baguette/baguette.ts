import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { BaguetteCondition } from 'types/baguetteCondition';
import { BaguetteType } from 'types/baguetteType';

export class Baguette {
  @ApiProperty({ example: '20.0', description: 'Price of the baguette' })
  price: number;

  @ApiProperty({ example: 25, description: 'Size (length) of the baguette (integer)' })
  sizeCm: number;

  @ApiProperty({
    enum: BaguetteType,
    enumName: 'Baguettes type',
  })
  type: BaguetteType;

  @ApiProperty({
    enum: BaguetteCondition,
    enumName: 'Baguettes condition',
  })
  condition: BaguetteCondition;

  @ApiProperty()
  bakedAt: DateTime;
}
