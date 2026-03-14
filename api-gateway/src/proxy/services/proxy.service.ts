/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { serviceConfig } from 'src/config/gateway.config';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  async proxyRequest(
    serviceName: keyof typeof serviceConfig,
    method: string,
    path?: string,
    data?: any,
    headers?: any,
    userInfo?: any,
  ): Promise<any> {
    const service = serviceConfig[serviceName];
    const url = `${service.url}${path}`;

    this.logger.log(
      `Proxying request to ${serviceName} at ${url} with method ${method}`,
    );

    try {
      const enhancedHeaders = {
        ...headers,
        'x-user-id': userInfo?.userId,
        'x-user-email': userInfo?.email,
        'x-user-roles': userInfo?.role,
      };

      const response = await firstValueFrom(
        this.httpService.request({
          method: method.toLocaleLowerCase() as any,
          url,
          data,
          headers: enhancedHeaders,
          timeout: service.timeout,
        }),
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Error proxying request to ${serviceName}: ${error.message}`,
      );
      throw error;
    }
  }

  async getServicehealth(serviceName: keyof typeof serviceConfig) {
    try {
      const service = serviceConfig[serviceName];
      const url = `${service.url}/health`;

      const response = await firstValueFrom(
        this.httpService.get(url, { timeout: 3000 }),
      );
      return { status: 'healthy', data: response.data };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}
