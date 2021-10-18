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
import { ShopNotFoundError } from 'exceptions/shop-not-found';
import { HttpErrorItem } from 'resources/http-error-item';
import { Shop } from 'resources/shop';
import { ShopService } from 'services/shop';
import { CreateShopBody } from 'validators/shop/createShopBody';
import { UpdateShopBody } from 'validators/shop/updateShopBody';

@ApiTags('shops')
@Controller('shops')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseFilters(new ApiErrorFilter())
export class ShopController {
  constructor(private readonly shopsService: ShopService) {}

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: Shop })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Shop> {
    return await this.shopsService.findOneShop(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Shop] })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async getAll(): Promise<Shop[]> {
    return await this.shopsService.findAllShops();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Shop })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async post(@Body() shop: CreateShopBody): Promise<Shop> {
    return await this.shopsService.createShop(shop);
  }

  @Patch('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateShopBody })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateShopBody })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() Shop: UpdateShopBody): Promise<Shop> {
    return await this.shopsService.updateShop(id, Shop);
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(ShopNotFoundError, HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.shopsService.deleteShop(id);
  }
}
