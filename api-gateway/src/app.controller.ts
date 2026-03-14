import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProxyService } from './proxy/services/proxy.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly proxyService: ProxyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        users: await this.proxyService.getServicehealth('users'),
        products: await this.proxyService.getServicehealth('products'),
        checkout: await this.proxyService.getServicehealth('checkout'),
        payments: await this.proxyService.getServicehealth('payments'),
      },
    };
  }
}
