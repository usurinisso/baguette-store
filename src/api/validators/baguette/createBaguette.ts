import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, ValidateIf } from 'class-validator';
import { BaguetteCondition } from 'types/baguetteCondition';
import { BaguetteType } from 'types/baguetteType';

export class CreateBaguette {
  @ApiProperty({ example: '20.0', description: 'Price of the baguette' })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 25, description: 'Size (length) of the baguette (integer)' })
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  sizeCm: number;

  @ApiProperty({
    enum: BaguetteType,
    enumName: 'Baguettes type',
  })
  @ValidateIf((o) => 'type' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(BaguetteType)
  type: BaguetteType;

  @ApiProperty({
    enum: BaguetteCondition,
    enumName: 'Baguettes condition',
  })
  @ValidateIf((o) => 'condition' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(BaguetteCondition)
  condition: BaguetteCondition;
}
