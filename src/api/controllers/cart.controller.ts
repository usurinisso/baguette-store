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
import { CartNotFoundError } from 'exceptions/cart-not-found';
import { Cart } from 'resources/cart';
import { HttpErrorItem } from 'resources/http-error-item';
import { CartService } from 'services/cart';
import { CreateCartBody } from 'validators/cart/createCartBody';
import { UpdateCartBody } from 'validators/cart/updateCartBody';

@ApiTags('carts')
@Controller('carts')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseFilters(new ApiErrorFilter())
export class CartController {
  constructor(private readonly cartsService: CartService) {}

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: Cart })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(CartNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    return Cart.from(await this.cartsService.findOneCart(id));
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Cart] })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async getAll(): Promise<Cart[]> {
    return (await this.cartsService.findAllCarts()).map(Cart.from);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Cart })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async post(@Body() cart: CreateCartBody): Promise<Cart> {
    return Cart.from(await this.cartsService.createCart(cart));
  }

  @Patch('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateCartBody })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(CartNotFoundError, HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateCartBody })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() cart: UpdateCartBody): Promise<Cart> {
    return Cart.from(await this.cartsService.updateCart(id, cart));
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(CartNotFoundError, HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cartsService.deleteCart(id);
  }
}
