import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ExceptionDto } from 'dto/exception.dto';

type ResultValue = {
  name: string;
  message: string | string[];
  status: number;
  stack?: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception Logger');

  processBadRequestException(exception: BadRequestException): string[] {
    const messageArray: string[] = [];
    const exceptionInfo = JSON.stringify(exception.getResponse());
    const exceptionInfoParsed = JSON.parse(exceptionInfo);
    if (exceptionInfoParsed.message instanceof Object) {
      for (const exceptionMessage of exceptionInfoParsed.message) {
        for (const value of Object.values(exceptionMessage.constraints)) {
          messageArray.push(value as string);
        }
      }
      return messageArray;
    }
  }

  processHttpException(exception: HttpException): ResultValue {
    let message: string | string[];
    const status = exception.getStatus();
    message = exception.message;
    const name = exception.name;
    if (exception instanceof BadRequestException) {
      const messageArray = this.processBadRequestException(exception);
      message = messageArray ? messageArray : message;
    }
    return { status, message, name };
  }

  processOtherExceptions(exception: Error): ResultValue {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Oops! We might be having technical issues at the moment, try again later';
    const name = 'Internal Server Error';
    const stack = exception.stack;
    return { status, message, name, stack };
  }

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const path = request && request.url;
    const method = request && request.method;
    const errorRequestMessage = path && method ? 'ON REQUEST ' + method + '=' + path : 'ON INTERNAL ERROR';

    let result;
    if (exception instanceof HttpException) {
      result = this.processHttpException(exception);
      this.logger.error(errorRequestMessage + '\n' + result.status + '-' + result.name + ' ' + result.message);
    } else {
      result = this.processOtherExceptions(exception);
      this.logger.error(
        errorRequestMessage + '\n' + result.status + '-' + result.name + ' ' + result.message,
        result.stack,
      );
    }
    const responseObject = {
      ...new ExceptionDto(),
      ...{
        error: result.name,
        statusCode: result.status,
        message: result.message,
        timestamp: new Date().toISOString(),
        path: path,
      },
    };

    response.status(result.status).json(responseObject);
  }
}
