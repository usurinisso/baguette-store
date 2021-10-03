import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { BaguetteCondition } from 'types/baguetteCondition';
import { BaguetteType } from 'types/baguetteType';

export class Baguette {
  @ApiProperty({ example: 20.0, type: Number })
  price: number;

  @ApiProperty({ example: 25, type: Number })
  sizeCm: number;

  @ApiProperty({
    enum: BaguetteType,
    enumName: 'Baguettes type',
    example: 1,
  })
  type: BaguetteType;

  @ApiProperty({
    enum: BaguetteCondition,
    enumName: 'Baguettes condition',
    example: 1,
  })
  condition: BaguetteCondition;

  @ApiProperty({ example: DateTime.now(), type: DateTime })
  bakedAt: DateTime;
}
