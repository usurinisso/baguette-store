import { ApiProperty } from '@nestjs/swagger';
export class User {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'John' })
  firstName: string;

  @ApiProperty({ type: String, example: 'Snow' })
  lastName: string;

  @ApiProperty({ type: String, example: 'elma99' })
  userName: string;
}
