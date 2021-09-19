import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { BaguetteCondition } from 'persistence/entities/enums/baguetteCondition.enum';
import { BaguetteType } from 'persistence/entities/enums/baguetteType.enum';

export class BaguetteDto {
  @ApiProperty({ example: 1, description: 'Baguette id' })
  id: number;

  @ApiProperty({ example: '20.0', description: 'Price of the baguette' })
  price: number;

  @ApiProperty({ example: 25, description: 'Size (length) of the baguette (integer)' })
  sizeCm: number;

  @ApiProperty({
    enum: BaguetteType,
    enumName: 'Baguette type',
  })
  type: BaguetteType;

  @ApiProperty({
    enum: BaguetteCondition,
    enumName: 'Baguette condition',
  })
  condition: BaguetteCondition;

  @ApiProperty()
  bakedAt: DateTime;

  toString(): string {
    return (
      '\n{\n' +
      `  id: ${this.id},\n  price: ${this.price},\n  sizeCm: ${this.sizeCm},\n  type: ${this.type},\n  condition: ${
        this.condition
      },\n  bakedAt: '${this.bakedAt.toISO()}'\n` +
      '}\n'
    );
  }
}
