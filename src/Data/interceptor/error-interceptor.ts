import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { error } from 'console';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';
import { ERROR_LIST } from './errorlist-interceptor';
import { ICatchRespose } from '../interfaces/data/error-respnse';

@Injectable()
export class TransformAndExceptionInterceptor implements NestInterceptor {
  private static getDetailError(error: any): ICatchRespose {
    let errorKey = error.constructor.name;

    if (
      error instanceof QueryFailedError &&
      error.driverError &&
      error.driverError.code
    ) {
      errorKey = `${error.constructor.name}:${error.driverError.code}`;
    }

    const errorDetail =
      ERROR_LIST[errorKey] || ERROR_LIST['InternalServerErrorException'];

    if (typeof errorDetail === 'function') {
      return errorDetail(error);
    }

    return errorDetail;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    console.log(`Manejo de la solicitud ${method} ${url}...`);

    return next.handle().pipe(
      catchError((err) => {
        console.error(`Error en la ruta ${url}:`, err.message);
        const errorDetail =
          TransformAndExceptionInterceptor.getDetailError(error);

        const customError = new HttpException(
          {
            status: errorDetail.status,
            message: errorDetail.message,
            additionalInfo: {
              ...errorDetail.additionalInfo,
            },
          },
          errorDetail.status,
        );
        return throwError(() => customError);
      }),
      tap(() => {
        const elapsedTime = Date.now() - now;
        console.log(
          `La solicitud ${url} se ha ejecutado con éxito en ${elapsedTime}ms`,
        );
      }),
    );
  }
}

// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
//   HttpException,
//   BadRequestException,
//   UnauthorizedException,
//   ForbiddenException,
//   NotFoundException,
//   ConflictException,
//   InternalServerErrorException,
// } from '@nestjs/common';

// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable()
// export class ErrorInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       catchError((error) => {
//         // Manejar errores comunes
//         if (error instanceof BadRequestException) {
//           return throwError(() => new BadRequestException('Solicitud incorrecta, verifica los datos enviados.'));
//         }
//         if (error instanceof UnauthorizedException) {
//           return throwError(() => new UnauthorizedException('Acceso no autorizado, se requiere autenticación.'));
//         }
//         if (error instanceof ForbiddenException) {
//           return throwError(() => new ForbiddenException('Acceso prohibido, no tienes los permisos necesarios.'));
//         }
//         if (error instanceof NotFoundException) {
//           return throwError(() => new NotFoundException('El recurso solicitado no fue encontrado.'));
//         }
//         if (error instanceof ConflictException) {
//           return throwError(() => new ConflictException('Conflicto, ya existe un recurso similar.'));
//         }
//         if (error instanceof InternalServerErrorException) {
//           return throwError(() => new InternalServerErrorException('Ocurrió un error interno en el servidor.'));
//         }

//         // Manejar cualquier otro error
//         if (error instanceof HttpException) {
//           return throwError(() => error); // Dejar que otros HttpExceptions pasen sin modificaciones
//         }

//         // Si es un error inesperado, retornar un error 500
//         return throwError(() => new InternalServerErrorException('Ocurrió un error inesperado.'));
//       }),
//     );
//   }
// }
