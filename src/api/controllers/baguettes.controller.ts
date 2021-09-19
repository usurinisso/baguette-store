import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaguetteDto } from 'dto/baguette.dto';
import { CreateBaguetteDto } from 'dto/createBaguette.dto';
import { ExceptionDto } from 'dto/exception.dto';
import { UpdateBaguetteDto } from 'dto/updateBaguette.dto';
import { BaguettesService } from 'services/baguettes.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('baguettes')
@Controller('baguettes')
export class BaguettesController {
  constructor(private readonly baguettesService: BaguettesService) {}
  private readonly logger = new Logger(BaguettesController.name);

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Specified baguette found in database',
    type: BaguetteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. It might be missing data',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Specified baguette not found in the database',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDto,
  })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<BaguetteDto> {
    this.logger.debug('Controller getOne() baguette with id - ' + id);
    return await this.baguettesService.findOneBaguette(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All baguettes found in database',
    type: [BaguetteDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDto,
  })
  async getAll(): Promise<BaguetteDto[]> {
    this.logger.debug('Controller getAll() baguettes');
    return await this.baguettesService.findAllBaguettes();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'BaguetteDto successfully created',
    type: BaguetteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. It might be missing data',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDto,
  })
  @ApiBody({ type: CreateBaguetteDto })
  async post(@Body() baguette: CreateBaguetteDto): Promise<BaguetteDto> {
    this.logger.debug('Controller create() baguette', baguette);
    return await this.baguettesService.createBaguette(baguette);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Specified baguette replaced',
    type: CreateBaguetteDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Specified baguette created',
    type: BaguetteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. It might be missing data',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDto,
  })
  @ApiBody({ type: CreateBaguetteDto })
  async put(@Param('id', ParseIntPipe) id: number, @Body() baguette: CreateBaguetteDto): Promise<BaguetteDto> {
    this.logger.debug('Controller put() baguette with id - ' + id);
    return await this.baguettesService.createOrReplace(id, baguette);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Specified baguette updated',
    type: UpdateBaguetteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. It might be missing data',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Specified baguette not found in the database',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDto,
  })
  @ApiBody({ type: UpdateBaguetteDto })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() baguette: UpdateBaguetteDto): Promise<UpdateResult> {
    this.logger.debug('Controller patch() baguette with id - ' + id);
    if (Object.entries(baguette).length !== 0) {
      return await this.baguettesService.updateBaguette(id, baguette);
    }
    this.logger.debug('Controller patch() baguette with id - ' + id + ' Bad Request Exception (missing fields)');
    throw new BadRequestException('Patch must contain at least one updatable field');
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Specified baguette deleted',
    type: DeleteResult,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. It might be missing data',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Specified baguette not found in the database',
    type: ExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ExceptionDto,
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    this.logger.debug('Controller delete() baguette with id - ' + id);
    return await this.baguettesService.deleteBaguette(id);
  }
}
