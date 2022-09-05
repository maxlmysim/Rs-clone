import { Server } from '../../../server/server';
import { Statistics } from '../../../interface/server';

const date = new Date();
const curDate = `${date.getDate()}.${date.getMonth()}`;
const statData: Statistics = {
  learnedWords: 0,
  optional: {
    [curDate]: {
      countNewWords: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      serialRightAnswers: 0,
      gameSprint: {
        countNewWords: 0,
        rightAnswers: 0,
        wrongAnswers: 0,
        serialRightAnswers: 0,
      },
      gameAudioCall: {
        countNewWords: 0,
        rightAnswers: 0,
        wrongAnswers: 0,
        serialRightAnswers: 0,
      },
    },
  },
};

export class StatisticsController {
  private server: Server;

  public constructor() {
    this.server = new Server();
  }

  public async init():Promise<Statistics> {
    const data = await this.server.getStatistics()
      .then((res) => res.json())
      .then((obj) => obj)
      .catch(() => statData);
    return data;
  }
}
