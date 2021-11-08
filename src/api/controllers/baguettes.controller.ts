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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorFilter } from 'exception/api-error-filter';
import { ErrorStatus } from 'exception/error-status';
import { BaguetteNotFoundError } from 'exceptions/baguette-not-found';
import { ShopNotFoundError } from 'exceptions/shop-not-found';
import { Baguette } from 'resources/baguette';
import { HttpErrorItem } from 'resources/http-error-item';
import { BaguetteService } from 'services/baguette';
import { CreateBaguetteBody } from 'validators/baguette/createBaguetteBody';
import { UpdateBaguetteBody } from 'validators/baguette/updateBaguetteBody';

@ApiTags('baguettes')
@Controller('shops')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseFilters(new ApiErrorFilter())
export class BaguettesController {
  constructor(private readonly baguettesService: BaguetteService) {}

  @Get('/:shopId/baguettes/:id')
  @ApiResponse({ status: HttpStatus.OK, type: Baguette })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Baguette> {
    return Baguette.from(await this.baguettesService.findOneBaguette(shopId, id));
  }

  @Get('/:shopId/baguettes')
  @ApiResponse({ status: HttpStatus.OK, type: [Baguette] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  async getAll(@Param('shopId', ParseIntPipe) shopId: number): Promise<Baguette[]> {
    return (await this.baguettesService.findAllBaguettes(shopId)).map(Baguette.from);
  }

  @Post('/:shopId/baguettes')
  @ApiResponse({ status: HttpStatus.CREATED, type: Baguette })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  async post(@Param('shopId', ParseIntPipe) shopId: number, @Body() baguette: CreateBaguetteBody): Promise<Baguette> {
    return Baguette.from(await this.baguettesService.createBaguette(shopId, baguette));
  }

  @Patch('/:shopId/baguettes/:id')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateBaguetteBody })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  async patch(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() baguette: UpdateBaguetteBody,
  ): Promise<Baguette> {
    return Baguette.from(await this.baguettesService.updateBaguette(shopId, id, baguette));
  }

  @Delete('/:shopId/baguettes/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(BaguetteNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('shopId', ParseIntPipe) shopId: number, @Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.baguettesService.deleteBaguette(shopId, id);
  }
}
