import { userInfo } from '../../authorization/user';
import { Statistics, WordSettings } from '../../interface/server';
import { Server } from '../../server/server';
import { ModelSprintGame } from '../../interface/SprintGame';
import { ModelAudioGame } from '../../interface/audioGame';

export class SendStatistics {
  private server: Server;

  private readonly gameName: 'gameSprint' | 'gameAudioCall';

  private readonly date: string;

  private model: ModelSprintGame | ModelAudioGame;

  private statisticsDay!: Statistics;

  private statisticsWord!: WordSettings;

  private newWord!: number;

  public constructor(gameName: 'gameSprint' | 'gameAudioCall', model: ModelSprintGame | ModelAudioGame) {
    this.server = new Server();
    this.gameName = gameName;
    this.date = `${(new Date()).getDate()}.${(new Date()).getMonth()}`;
    this.model = model;
  }

  private resetStatisticDay():void {
    this.newWord = 0;
    this.statisticsDay = {
      learnedWords: 0,
      optional: {
        [this.date]: {
          countNewWords: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
          serialRightAnswers: 0,
          [this.gameName]: {
            countNewWords: 0,
            rightAnswers: 0,
            wrongAnswers: 0,
            serialRightAnswers: 0,
          },
        },
      },
    };
  }

  private resetStatisticWord():void {
    this.statisticsWord = {
      difficulty: 'easy',
      optional: {
        isWas: false,
        isLearned: false,
        correctAnswerRow: 0,
        isDelete: false,
        [this.gameName]: {
          rightCountAnswers: 0,
          wrongCountAnswers: 0,
        },
      },
    };
  }

  public async createStatistic():Promise<void > {
    this.resetStatisticDay();
    this.resetStatisticWord();

    await this.createStatisticWords();
    await this.createStatisticDay();
  }

  public async createStatisticWords():Promise<void > {
    if (!userInfo.login) return;

    const listRightWordsPromise = this.model.rightAnswers.map((word) => this.server.getUserWord(word.id)
      .then((response): void => {
        if (response.status === 404) {
          this.changeStatisticWordForRightAnswer(word.id);
          return;
        }
        if (response.ok) {
          this.changeStatisticWordForRightAnswer(word.id, response);
        }
      }));

    const listWrongWordsPromise = this.model.wrongAnswers.map((word) => this.server.getUserWord(word.id)
      .then((response): void => {
        if (response.status === 404) {
          this.changeStatisticWordForWrongAnswer(word.id);
          return;
        }
        if (response.ok) {
          this.changeStatisticWordForWrongAnswer(word.id, response);
        }
      }));

    await Promise.all(listRightWordsPromise);
    await Promise.all(listWrongWordsPromise);
  }

  private async changeStatisticWordForRightAnswer(wordId: string, wordResponse?: Response):Promise<void> {
    const word: WordSettings = JSON.parse(JSON.stringify(this.statisticsWord));

    if (wordResponse) {
      const wordResp: WordSettings = await wordResponse.json();
      word.difficulty = wordResp?.difficulty;
      Object.assign(word.optional, wordResp?.optional);
    }

    if (!word.optional.isWas) {
      word.optional.isWas = true;
      this.newWord += 1;
    }

    word.optional.correctAnswerRow += 1;
    if (word.optional.correctAnswerRow >= 3 && word.difficulty !== 'hard') {
      word.optional.isLearned = true;
    } else if (word.optional.correctAnswerRow >= 5) {
      word.optional.isLearned = true;
    }

    // @ts-ignore
    word.optional[this.gameName].rightCountAnswers += 1;

    if (wordResponse) {
      await this.server.updateUserWord(wordId, word);
    } else {
      await this.server.createUserWord(wordId, word);
    }
  }

  private async changeStatisticWordForWrongAnswer(wordId: string, wordResponse?: Response):Promise<void> {
    const word: WordSettings = JSON.parse(JSON.stringify(this.statisticsWord));

    if (wordResponse) {
      const wordResp: WordSettings = await wordResponse.json();
      word.difficulty = wordResp?.difficulty;
      Object.assign(word.optional, wordResp?.optional);
    }

    if (!word.optional.isWas) {
      word.optional.isWas = true;
      this.newWord += 1;
    }

    word.optional.correctAnswerRow = 0;
    // @ts-ignore
    word.optional[this.gameName].wrongCountAnswers += 1;

    if (wordResponse) {
      await this.server.updateUserWord(wordId, word);
    } else {
      await this.server.createUserWord(wordId, word);
    }
  }

  public async createStatisticDay(): Promise<void> {
    if (!userInfo.login) return;

    await this.server.getStatistics()
      .then((response) => {
        if (response.ok) {
          this.changeStatisticDay(response);
        }
        if (response.status === 404) {
          this.changeStatisticDay();
        }
      });
  }

  private async changeStatisticDay(statisticsResponse?: Response): Promise<void> {
    if (statisticsResponse) {
      const stat = await statisticsResponse.json();
      this.statisticsDay.learnedWords = stat.learnedWords;
      Object.assign(this.statisticsDay.optional[this.date], stat.optional[this.date]);
    }

    this.statisticsDay.optional[this.date].countNewWords += this.newWord;
    this.statisticsDay.optional[this.date].wrongAnswers += this.model.wrongAnswers.length;
    this.statisticsDay.optional[this.date].rightAnswers += this.model.rightAnswers.length;
    if (this.statisticsDay.optional[this.date].serialRightAnswers < this.model.maxSerialCorrectAnswer) {
      this.statisticsDay.optional[this.date].serialRightAnswers = this.model.maxSerialCorrectAnswer;
    }

    // @ts-ignore
    this.statisticsDay.optional[this.date][this.gameName].countNewWords += this.newWord;
    // @ts-ignore
    this.statisticsDay.optional[this.date][this.gameName].wrongAnswers += this.model.wrongAnswers.length;
    // @ts-ignore
    this.statisticsDay.optional[this.date][this.gameName].rightAnswers += this.model.rightAnswers.length;
    // @ts-ignore
    if (this.statisticsDay.optional[this.date][this.gameName].serialRightAnswers < this.model.maxSerialCorrectAnswer) {
      // @ts-ignore
      this.statisticsDay.optional[this.date][this.gameName].serialRightAnswers = this.model.maxSerialCorrectAnswer;
    }

    await this.server.updateStatistics(this.statisticsDay);
  }
}
