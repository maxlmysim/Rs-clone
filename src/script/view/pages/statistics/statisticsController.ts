import { Server } from '../../../server/server';
import { StatisticsOptional } from '../../../interface/server';

export class StatisticsController {
  private server: Server;

  public constructor() {
    this.server = new Server();
  }

  public async init():Promise<StatisticsOptional> {
    const data = await this.server.getStatistics()
      .then((res) => res.json())
      .then((obj) => obj.optional);
    return data;
  }
}
