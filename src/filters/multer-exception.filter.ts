// src/filters/multer-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { MulterError } from 'multer';
import { Response } from 'express';

@Catch(MulterError, PayloadTooLargeException)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(
    exception: MulterError | PayloadTooLargeException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string;
    let statusCode = 400;

    // اگر MulterError بود
    if (exception instanceof MulterError) {
      switch (exception.code) {
        case 'LIMIT_FILE_SIZE':
          message = 'حجم فایل بیش از حد مجاز است (حداکثر ۱ مگابایت)';
          statusCode = 413;
          break;
        case 'LIMIT_FILE_COUNT':
          message = 'تعداد فایل‌ها بیش از حد مجاز است';
          break;
        case 'LIMIT_UNEXPECTED_FILE':
          message = 'فیلد فایل نامعتبر است';
          break;
        default:
          message = 'خطا در آپلود فایل';
      }
    }
    // اگر PayloadTooLargeException بود
    else if (exception instanceof PayloadTooLargeException) {
      message = 'حجم فایل بیش از حد مجاز است';
      statusCode = 413;
    } else {
      message = 'خطا در آپلود فایل';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: 'upload_error',
    });
  }
}
