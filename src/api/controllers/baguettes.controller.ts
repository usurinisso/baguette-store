import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorFilter } from 'exception/api-error-filter';
import { ErrorStatus } from 'exception/error-status';
import { BaguetteNotFoundError } from 'exceptions/baguette-not-found';
import { Baguette } from 'resources/baguette/baguette';
import { HttpErrorItem } from 'resources/http-error-item';
import { BaguetteService } from 'services/baguette';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateBaguette } from 'validators/baguette/createBaguette';
import { UpdateBaguette } from 'validators/baguette/updateBaguette';

@ApiTags('baguettes')
@Controller('baguettes')
@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(new ApiErrorFilter())
export class BaguettesController {
  constructor(private readonly baguettesService: BaguetteService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: Baguette })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Baguette> {
    return await this.baguettesService.findOneBaguette(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Baguette] })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async getAll(): Promise<Baguette[]> {
    return await this.baguettesService.findAllBaguettes();
  }

  @Post()
  @ApiResponse({ status: 201, type: Baguette })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async post(@Body() baguette: CreateBaguette): Promise<Baguette> {
    return await this.baguettesService.createBaguette(baguette);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: UpdateBaguette })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateBaguette })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() baguette: UpdateBaguette): Promise<UpdateResult> {
    if (Object.entries(baguette).length !== 0) {
      return await this.baguettesService.updateBaguette(id, baguette);
    }
    throw new BadRequestException('Patch must contain at least one updatable field');
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: DeleteResult })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.baguettesService.deleteBaguette(id);
  }
}
