import { ICatchRespose } from '../interfaces/data/error-respnse';

export const ERROR_LIST: { [key: string]: (exception?: any) => ICatchRespose } =
  {
    Unauthorized: (exception?: any) => ({
      status: 401,
      message: exception?.message || 'No autorizado.',
    }),
    InvalidToken: (exception?: any) => ({
      status: 401,
      message:
        exception?.message || 'Invalid token provided. Please login again.',
    }),
    ExpiredToken: (exception?: any) => ({
      status: 401,
      message:
        exception?.message || 'Your session has expired. Please log in again.',
    }),
    Forbidden: (exception?: any) => ({
      status: 403,
      message:
        exception?.message ||
        'You do not have permission to access this resource.',
    }),
    AccessDenied: (exception?: any) => ({
      status: 403,
      message:
        exception?.message ||
        'Access denied. Insufficient privileges to access this resource.',
    }),
    NotFound: (exception?: any) => ({
      status: 404,
      message:
        exception?.message ||
        'The resource you are looking for could not be found.',
    }),
    BadRequest: (exception?: any) => ({
      status: 400,
      message:
        exception?.message ||
        'Bad request. The data sent is invalid or incomplete.',
    }),
    InternalServerError: (exception?: any) => ({
      status: 500,
      message:
        exception?.message ||
        'An unexpected error occurred. Please try again later.',
    }),
    DatabaseError: (exception?: any) => ({
      status: 500,
      message:
        exception?.message ||
        'A database error occurred. Please contact support.',
    }),
  };
