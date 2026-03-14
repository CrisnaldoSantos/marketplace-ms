/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: any, res: any, next: () => void) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${originalUrl} - IP:${ip} - User Agent: ${userAgent}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || 0;
      const duration = Date.now() - startTime;

      this.logger.log(
        `Completed Request: ${method} ${originalUrl} - Status: ${statusCode} - Content Length: ${contentLength} - Duration: ${duration}ms`,
      );

      if (statusCode >= 400) {
        this.logger.error(
          `Error Response: ${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`,
        );
      }
    });

    res.on('error', (err: any) => {
      const duration = Date.now() - startTime;
      this.logger.error(
        `Request Error: ${method} ${originalUrl} - Error: ${err.message} - Duration: ${duration}ms`,
      );
    });

    res.on('timeout', () => {
      const duration = Date.now() - startTime;
      this.logger.warn(
        `Request Timeout: ${method} ${originalUrl} - Duration: ${duration}ms`,
      );
    });
    next();
  }
}
