import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, ValidateIf } from 'class-validator';
import { BaguetteCondition } from 'persistence/entities/enums/baguetteCondition.enum';
import { BaguetteType } from 'persistence/entities/enums/baguetteType.enum';

export class UpdateBaguetteDto {
  @ApiProperty({ example: '20.0', description: 'Price of the baguette' })
  @ValidateIf((o) => 'price' in o) //This was fun.. IsOptional lets "price": null through.. also
  @IsDefined() // https://github.com/typestack/class-validator/issues/308
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ example: 25, description: 'Size (length) of the baguette (integer)' })
  @ValidateIf((o) => 'sizeCm' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  sizeCm?: number;

  @ApiProperty({
    enum: BaguetteType,
    enumName: 'Baguette type',
  })
  @ValidateIf((o) => 'type' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(BaguetteType)
  type?: BaguetteType;

  @ApiProperty({
    enum: BaguetteCondition,
    enumName: 'Baguette condition',
  })
  @ValidateIf((o) => 'condition' in o)
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(BaguetteCondition)
  condition?: BaguetteCondition;

  toString(): string {
    return (
      '\n{\n' +
      `  price: ${this.price},\n  sizeCm: ${this.sizeCm},\n  type: ${this.type},\n  condition: ${this.condition}\n` +
      '}\n'
    );
  }
}
