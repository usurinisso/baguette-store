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
import { UserNotFoundError } from 'exceptions/user-not-found';
import { HttpErrorItem } from 'resources/http-error-item';
import { User } from 'resources/user';
import { UserExtended } from 'resources/user-extended';
import { UserService } from 'services/user';
import { CreateUserBody } from 'validators/user/createUserBody';
import { UpdateUserBody } from 'validators/user/updateUserBody';

@ApiTags('users')
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseFilters(new ApiErrorFilter())
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return UserExtended.from(await this.usersService.findOneUser(id));
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async getAll(): Promise<User[]> {
    return (await this.usersService.findAllUsers()).map((user) => User.from(user));
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  async post(@Body() user: CreateUserBody): Promise<User> {
    return User.from(await this.usersService.createUser(user));
  }

  @Patch('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserBody })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  @ApiBody({ type: UpdateUserBody })
  async patch(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserBody): Promise<User> {
    return User.from(await this.usersService.updateUser(id, user));
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: HttpErrorItem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: HttpErrorItem })
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
