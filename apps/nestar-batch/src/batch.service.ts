import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchService {
  
  public async batchRollback(): Promise<void> {
    console.log('batchRollback executed');
  }
  
  public async batchProperties(): Promise<void> {
    console.log('batchProperties executed');
  }
  
  public async batchAgents(): Promise<void> {
    console.log('batchAgents executed');
  }
  
  public getHello(): string {
    return 'Welcome to Nestar-Batch Server!!';
  }
}
