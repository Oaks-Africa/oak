import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Cache } from 'cache-manager';

import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('test') private testQueue: Queue
  ) {}

  async getData(): Promise<{ message: string }> {
    const message = await this.cacheManager.get<string>('welcome');

    await this.testQueue.add({
      message,
      key: 'welcome',
    });

    return { message };
  }
}
