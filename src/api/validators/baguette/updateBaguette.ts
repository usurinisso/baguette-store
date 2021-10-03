import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, ValidateIf } from 'class-validator';
import { BaguetteCondition } from 'types/baguetteCondition';
import { BaguetteType } from 'types/baguetteType';

export class UpdateBaguette {
  @ApiProperty({ example: 20.0, type: Number })
  @ValidateIf((o) => 'price' in o) //This was fun.. IsOptional lets "price": null through.. also
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ example: 25, type: Number })
  @ValidateIf((o) => 'sizeCm' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  sizeCm?: number;

  @ApiProperty({
    enum: BaguetteType,
    enumName: 'Baguettes type',
    example: 1,
  })
  @ValidateIf((o) => 'type' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(BaguetteType)
  type?: BaguetteType;

  @ApiProperty({
    enum: BaguetteCondition,
    enumName: 'Baguettes condition',
    example: 1,
  })
  @ValidateIf((o) => 'condition' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(BaguetteCondition)
  condition?: BaguetteCondition;
}
