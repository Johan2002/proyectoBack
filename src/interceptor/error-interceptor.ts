import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TransformAndExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); // Captura el tiempo inicial

    // Captura el contexto de la solicitud
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    console.log(`Handling ${method} request to ${url}...`);

    return next.handle().pipe(
      // Manejo de errores global
      catchError((err) => {
        console.error(`Error en la ruta ${url}:`, err.message);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Error interno del servidor';

        // Detectar el tipo de excepción
        if (err instanceof HttpException) {
          status = err.getStatus();
          const response = err.getResponse();

          // Asegurarse de que el mensaje sea un string
          if (typeof response === 'string') {
            message = response;
          } else if (typeof response === 'object' && response !== null) {
            // Si es un objeto, puedes acceder a la propiedad que deseas
            message = (response as any).message || 'Error desconocido'; // Ajusta esto según tu estructura de respuesta
          }
        }

        return throwError(
          new HttpException(
            {
              success: false,
              message: message,
              statusCode: status,
            },
            status,
          ),
        );
      }),
      // Transformación de respuesta
      map((data) => ({
        success: true,
        data: data,
      })),
      // Log del tiempo de respuesta
      tap(() => {
        const elapsedTime = Date.now() - now;
        console.log(`Request to ${url} handled successfully in ${elapsedTime}ms`);
      }),
    );
  }
}