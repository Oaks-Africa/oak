import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';

import { Cache } from 'cache-manager';
import { Job } from 'bull';

@Processor('test')
export class TestConsumer {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Process()
  async processTest(job: Job<{ message: string; key: string }>) {
    console.log('JOB STARTED!!');
    await job.progress(0);
    await this.delay(500);
    await job.progress(20);
    await this.delay(5000);

    const { message, key } = job.data;

    const words = TestConsumer.shuffle(message.split(' '));
    const newMessage = words.join(' ');

    await job.progress(70);

    await this.cacheManager.set(key, newMessage, { ttl: 0 });

    await this.delay(500);

    await job.progress(100);

    return {};
  }

  private static shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
