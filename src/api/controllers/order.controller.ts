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
import { OrderNotFoundError } from 'exceptions/order-not-found';
import { HttpErrorItem } from 'resources/http-error-item';
import { Order } from 'resources/order';
import { OrderService } from 'services/order';
import { CreateOrderBody } from 'validators/order/createOrderBody';
import { UpdateOrderBody } from 'validators/order/updateOrderBody';

@ApiTags('orders')
@Controller('orders')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseFilters(new ApiErrorFilter())
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: Order })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(OrderNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return Order.from(await this.ordersService.findOneOrder(id));
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Order] })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async getAll(): Promise<Order[]> {
    return (await this.ordersService.findAllOrders()).map(Order.from);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Order })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async post(@Body() order: CreateOrderBody): Promise<Order> {
    return Order.from(await this.ordersService.createOrder(order));
  }

  @Patch('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateOrderBody })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(OrderNotFoundError, HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateOrderBody })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() order: UpdateOrderBody): Promise<Order> {
    return Order.from(await this.ordersService.updateOrder(id, order));
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(OrderNotFoundError, HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.ordersService.deleteOrder(id);
  }
}
