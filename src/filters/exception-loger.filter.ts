import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsLoggerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsLoggerFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception['status'] || 500;

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(exception.response, undefined, 2)}`,
    );

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.response,
    });
  }
}
