import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getData(): Promise<{ message: string }> {
    const message = await this.cacheManager.get<string>('welcome');
    return { message };
  }
}
