import { userInfo } from '../../authorization/user';
import { Statistics, WordSettings } from '../../interface/server';
import { Server } from '../../server/server';
import { ModelSprintGame } from '../../interface/SprintGame';

export class SendStatistics {
  private server: Server;

  private readonly gameName: 'gameSprint' | 'gameAudioCall';

  private readonly date: string;

  private model: ModelSprintGame;

  private statisticsDay!: Statistics;

  private statisticsWord!: WordSettings;

  private newWord!: number;

  public constructor(gameName: 'gameSprint' | 'gameAudioCall', model: ModelSprintGame) {
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

  public async createStatisticWords():Promise<void > {
    if (!userInfo.login) return;
    this.resetStatisticWord();

    this.model.rightAnswers.forEach((word) => this.server.getUserWord(word.id)
      .then((response): void => {
        if (response.status === 404) {
          this.changeStatisticWordForRightAnswer(word.id);
        }
        if (response.ok) {
          this.changeStatisticWordForRightAnswer(word.id, response);
        }
      }));

    this.model.wrongAnswers.forEach((word) => this.server.getUserWord(word.id)
      .then((response): void => {
        if (response.status === 404) {
          this.changeStatisticWordForWrongAnswer(word.id);
        }
        if (response.ok) {
          this.changeStatisticWordForWrongAnswer(word.id, response);
        }
      }));
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
    this.resetStatisticDay();

    await this.createStatisticWords();

    await this.server.getStatistics()
      .then((response) => {
        if (response.ok) {
          this.changeStatisticDay(response);
        }
        if (response.status === 404) {
          this.changeStatisticDay();
        }
      });

    this.server.getUserAllWords().then((data) => console.log(data));
    this.server.getStatistics().then((data) => data.json()).then((data1) => console.log(data1));
  }

  private async changeStatisticDay(statisticsResponse?: Response): Promise<void> {
    if (statisticsResponse) {
      const stat = await statisticsResponse.json();
      this.statisticsDay.learnedWords = stat.learnedWords;
      Object.assign(this.statisticsDay.optional, stat.optional);
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

  // public async checkStatisticWord(id: string, isRightAnswer: boolean): Promise<void> {
  //   if (!userInfo.login) return;
  //
  //   this.server.getUserWord(id)
  //     .then((response) => {
  //       this.updateStatisticWord(response, id, isRightAnswer);
  //     })
  //     .catch((err) => {
  //       if (err.status === 404) {
  //         this.createStatisticWord(id, isRightAnswer);
  //         return;
  //       }
  //       console.log(err);
  //     });
  // }

  // private async updateStatisticWord(wordSettings: WordSettings, id: string, isRightAnswer: boolean): Promise<void> {
  //   if (!wordSettings) return;
  //
  //   const word: WordSettings = {
  //     difficulty: wordSettings.difficulty ? wordSettings.difficulty : 'easy',
  //     optional: { ...wordSettings.optional },
  //   };
  //
  //   let optionsGame: CountAnswersForGame;
  //
  //   if (word.optional[this.gameName]) {
  //     // @ts-ignore
  //     optionsGame = word.optional[this.gameName];
  //   } else {
  //     // @ts-ignore
  //     word.optional[this.gameName] = {};
  //     // @ts-ignore
  //     optionsGame = word.optional[this.gameName];
  //   }
  //
  //   if (isRightAnswer) {
  //     optionsGame.rightCountAnswers = optionsGame.rightCountAnswers ? optionsGame.rightCountAnswers + 1 : 1;
  //     word.optional.correctAnswerRow = word.optional.correctAnswerRow ? word.optional.correctAnswerRow + 1 : 1;
  //   } else {
  //     optionsGame.wrongCountAnswers = optionsGame.wrongCountAnswers ? optionsGame.wrongCountAnswers + 1 : 1;
  //     word.optional.correctAnswerRow = 0;
  //   }
  //
  //   if (word.optional.correctAnswerRow >= 3 && word.difficulty !== 'hard') {
  //     word.optional.isLearned = true;
  //   } else if (word.optional.correctAnswerRow >= 5) {
  //     word.optional.isLearned = true;
  //   }
  //
  //   await this.server.updateUserWord(id, word);
  //   this.server.getUserWord(id).then((data) => console.log(data));
  // }

  // private async createStatisticWord(id: string, isRightAnswer: boolean): Promise<void> {
  //   const word: WordSettings = {
  //     optional: { },
  //   };
  //
  //   if (!word.optional[this.gameName]) {
  //     word.optional[this.gameName] = {};
  //   }
  //
  //   if (isRightAnswer) {
  //     // @ts-ignore
  //     word.optional[this.gameName].rightCountAnswers = 1;
  //     word.optional.correctAnswerRow = 1;
  //   } else {
  //     // @ts-ignore
  //     word.optional[this.gameName].wrongCountAnswers = 1;
  //   }
  //
  //   await this.server.createUserWord(id, word);
  // }
}
