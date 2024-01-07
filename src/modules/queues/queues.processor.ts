import { ApiService } from '@app/common/services/api';
import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Orders } from '../orders/schemas/order.schema';

@Processor('tax')
@Injectable()
export class TaxQueueProcessor {
  constructor(
    private apiService: ApiService,
    @InjectModel(Orders.name) private orderModel: Model<Orders>
  ) {}

  private readonly logger = new Logger(TaxQueueProcessor.name); // Pass the context

  @Process('log_tax')
  async sendSms(job: Job) {
    try {
      await this.apiService.SendOrderDetails(job.data);
      this.logger.debug('job processed');
    } catch (error) {
      this.logger.error({ error: 'job failed' });
      throw error;
    }
  }

@Process('log_transaction')
async logTransaction(job:Job){
  try{
    const createdCat = new this.orderModel(job.data);
    createdCat.save();
    this.logger.debug('job processed');
  }catch(error){
    this.logger.error({ error: error.message });
    throw error;
  }
}

}
