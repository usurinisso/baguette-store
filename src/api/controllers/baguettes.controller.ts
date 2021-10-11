import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { CreateBaguette } from 'validators/baguette/createBaguette';
import { UpdateBaguette } from 'validators/baguette/updateBaguette';

@ApiTags('baguettes')
@Controller('baguettes')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseFilters(new ApiErrorFilter())
export class BaguettesController {
  constructor(private readonly baguettesService: BaguetteService) {}

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: Baguette })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Baguette> {
    return await this.baguettesService.findOneBaguette(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Baguette] })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async getAll(): Promise<Baguette[]> {
    return await this.baguettesService.findAllBaguettes();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Baguette })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async post(@Body() baguette: CreateBaguette): Promise<Baguette> {
    return await this.baguettesService.createBaguette(baguette);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateBaguette })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateBaguette })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() baguette: UpdateBaguette): Promise<Baguette> {
    return await this.baguettesService.updateBaguette(id, baguette);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.baguettesService.deleteBaguette(id);
  }
}
