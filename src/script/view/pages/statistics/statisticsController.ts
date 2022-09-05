import { Server } from '../../../server/server';
import { Statistics } from '../../../interface/server';

export class StatisticsController {
  private server: Server;

  public constructor() {
    this.server = new Server();
  }

  public async init():Promise<Statistics> {
    const data = await this.server.getStatistics()
      .then((res) => res.json())
      .then((obj) => obj);
    return data;
  }
}
