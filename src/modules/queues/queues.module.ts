import { Module } from '@nestjs/common';
import { TaxQueueProcessor } from './queues.processor';

@Module({
  providers: [TaxQueueProcessor],
  exports: [],
})
export class QueuesModule {}
