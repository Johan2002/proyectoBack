import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ICatchBodyResponse } from '../../interfaces/data/catch-error.interface';
import ErrorsList from './errorlist-interceptor';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger('ErrorCatch');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const exeptionName = exception.constructor.name;
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorCached = ErrorsList[exeptionName];
    let responseBody: ICatchBodyResponse = {
      message: (exception as any).message.message,
      code: 'HttpException',
      status: 500,
    };

    if (errorCached) {
      responseBody = errorCached(exception);
      this.logger.error(`Error handled ${exception} ${responseBody.message}`);
    }

    if (!errorCached) {
      const message: string | undefined = (exception as any).message;
      if (message) responseBody.message = message;
      this.logger.error(
        `Error not handled, description ${
          typeof exception === 'object' ? JSON.stringify(exception) : exception
        }, message ${message}`,
      );
    }

    responseBody.path = httpAdapter.getRequestUrl(ctx.getRequest());
    responseBody.status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    httpAdapter.reply(response, responseBody, responseBody.status);
  }
}
