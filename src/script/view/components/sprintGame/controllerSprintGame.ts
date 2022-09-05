import { ControllerApp } from '../../../controller/controller';
import { getRandomIndexFromArray, resetKeyDownListener, shuffleWordList } from '../../../helper/helper';
import { Server } from '../../../server/server';
import { modelSprintGame } from './modelSprintGame';
import { ViewSprintGame } from './viewSprintGame';
import { ModelSprintGame } from '../../../interface/SprintGame';
import successSound from '../../../../assets/sounds/correct.mp3';
import failSound from '../../../../assets/sounds/wrong.mp3';
import { Word } from '../../../interface/server';
import { SendStatistics } from '../SendStatistics';

export class ControllerSprintGame {
  private controllerApp: ControllerApp;

  private server: Server;

  private view: ViewSprintGame;

  private model: ModelSprintGame;

  public img!: HTMLElement;

  private sendStatistics: SendStatistics;

  public constructor(view: ViewSprintGame) {
    this.controllerApp = new ControllerApp();
    this.server = new Server();
    this.view = view;
    this.model = modelSprintGame;
    this.sendStatistics = new SendStatistics('gameSprint', this.model);
  }

  public async loadWordsAndStartGame(list?: Word[]): Promise<void> {
    this.model.resetAll();

    let listWords;

    if (list) {
      listWords = [...list];
    } else {
      const randomPage = Math.floor(Math.random() * 30);
      listWords = await this.server.getAllWords(this.model.difficulty - 1, randomPage);
    }

    shuffleWordList(listWords);

    this.model.lastNumWord = listWords.length - 1;
    this.model.listWords.push(...listWords);

    this.createSettingsForModel();
    this.controllerApp.openPage(
      this.view.createGame(),
    );

    this.addListener();
  }

  public nextWord(): void {
    if (this.model.currentNumWord === this.model.lastNumWord) {
      resetKeyDownListener();
      this.view.showResults();
      resetKeyDownListener();
      this.sendStatistics.createStatistic();
      return;
    }

    this.model.applySettingsNextPage();
    this.createSettingsForModel();

    this.view.changeWordOnPage();
  }

  private createSettingsForModel():void {
    this.model.englishWord = this.model.listWords[this.model.currentNumWord].word;

    if (Math.random() < 0.5) {
      this.createSettingsModelForCorrectAnswer();
    } else {
      this.createSettingsModelForIncorrectAnswer();
    }
  }

  private createSettingsModelForCorrectAnswer(): void {
    this.model.isTrue = true;
    this.model.translateWord = this.model.listWords[this.model.currentNumWord].wordTranslate;
  }

  private createSettingsModelForIncorrectAnswer(): void {
    this.model.isTrue = false;
    const indexEnglishWord = getRandomIndexFromArray(this.model.listWords.length, this.model.currentNumWord);
    this.model.translateWord = this.model.listWords[indexEnglishWord].wordTranslate;
  }

  public changeDifficulty(difficulty: number): void {
    this.model.difficulty = difficulty;
  }

  public checkAnswer(answer:boolean):void {
    if (answer === this.model.isTrue) {
      this.rightAnswer();
    } else {
      this.wrongAnswer();
    }

    this.view.addMarkToCounterCorrectAnswer();
    this.nextWord();
  }

  public wrongAnswer(): void {
    this.model.wrongAnswers.push(this.model.listWords[this.model.currentNumWord]);
    this.model.serialCorrectAnswerForAccount = 0;
    this.model.serialCorrectAnswer = 0;

    const audio = new Audio(failSound);
    audio.play();
  }

  public rightAnswer(): void {
    this.model.rightAnswers.push(this.model.listWords[this.model.currentNumWord]);
    this.model.isCurrentAnswerRights = true;

    const audio = new Audio(successSound);
    audio.play();

    this.model.serialCorrectAnswer += 1;
    if (this.model.maxSerialCorrectAnswer < this.model.serialCorrectAnswer) {
      this.model.maxSerialCorrectAnswer = this.model.serialCorrectAnswer;
    }

    if (this.model.serialCorrectAnswerForAccount >= 3) {
      this.model.serialCorrectAnswerForAccount = 0;
      this.model.account += 40;
    } else {
      this.model.serialCorrectAnswerForAccount += 1;
    }

    this.model.account += 20;
    this.view.changeCurrentAccount();
  }

  private addListener():void {
    document.body.onkeydown = (e):void => {
      switch (e.key) {
        case 'ArrowLeft':
          this.view.correctButton.click();
          break;

        case 'ArrowRight':
          this.view.incorrectButton.click();
          break;
        default:
      }
    };
  }
}
