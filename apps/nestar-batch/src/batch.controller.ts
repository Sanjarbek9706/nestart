import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES } from './lib/config';

@Controller()
export class BatchController {
  private readonly logger = new Logger(BatchController.name);

  constructor(private readonly batchService: BatchService) {}

  @Timeout(1000)
  handleTimeout(): void {
    this.logger.debug('BATCH SERVER READY!');
  }

  @Cron('00 * * * * *', { name: BATCH_ROLLBACK })
  public async batchRollback() {
    try {
      this.logger.log['context'] = BATCH_ROLLBACK;
      this.logger.debug('EXECUTED!');
      await this.batchService.batchRollback();
    } catch (error) {
      this.logger.error('Error occurred while executing batchRollback');
    }
  }

  @Cron('20 * * * * *', { name: BATCH_TOP_PROPERTIES })
  public async batchProperties() {
    try {
      this.logger.log['context'] = BATCH_TOP_PROPERTIES;
      this.logger.debug('EXECUTED!');
      await this.batchService.batchProperties();
    } catch (error) {
      this.logger.error('Error occurred while executing batchProperties');
    }
  }

  @Cron('40 * * * * *', { name: BATCH_TOP_AGENTS })
  public async batchAgents() {
    try {
      this.logger.log['context'] = BATCH_TOP_AGENTS;
      this.logger.debug('EXECUTED!');
      await this.batchService.batchAgents();
    } catch (error) {
      this.logger.error('Error occurred while executing batchAgents');
    }
  }

  /**
   * @Interval(1000)
   * handleInterval(): void {
   *   this.logger.debug('INTERVAL TEST');
   * }
   */

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }
}
