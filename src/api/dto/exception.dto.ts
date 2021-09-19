import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty({ example: 'NotFoundException', description: 'Error name' })
  name: string;

  @ApiProperty({ example: 404, description: 'Error status code' })
  statusCode: number;

  @ApiProperty({ example: 'Patch must contain atleast one updatable field!', description: 'Error cause message' })
  message: string | string[];

  @ApiProperty({ example: '2011-10-05T14:48:00.000Z', description: 'Error timestamp' })
  timestamp: string;

  @ApiProperty({ example: '/reservation/1', description: 'Request path' })
  path?: string;
}
