import { ControllerApp } from '../../../controller/controller';
import { createTag, resetKeyDownListener, shuffleWordList } from '../../../helper/helper';
import { Server } from '../../../server/server';
import { modelAudioGame } from './modelAudioGame';
import { ViewAudioGame } from './viewAudioGame';
import { ModelAudioGame } from '../../../interface/audioGame';
import successSound from '../../../../assets/sounds/correct.mp3';
import failSound from '../../../../assets/sounds/wrong.mp3';
import { CSSClass } from '../../../interface/freeText';
import { Word } from '../../../interface/server';
import { SendStatistics } from '../SendStatistics';

export class ControllerAudioGame {
  private controllerApp: ControllerApp;

  private server: Server;

  private view: ViewAudioGame;

  private model: ModelAudioGame;

  public img!: HTMLElement;

  private sendStatistics: SendStatistics;

  public constructor(view: ViewAudioGame) {
    this.controllerApp = new ControllerApp();
    this.server = new Server();
    this.view = view;
    this.model = modelAudioGame;
    this.sendStatistics = new SendStatistics('gameAudioCall', this.model);
  }

  public async loadWordsAndStartGame(list?: Word[]): Promise<void> {
    this.model.resetAll();

    let listWords = [];
    if (list) {
      listWords = [...list];
    } else {
      const randomPage = Math.floor(Math.random() * 30);
      listWords = await this.server.getAllWords(this.model.difficulty - 1, randomPage);
    }

    shuffleWordList(listWords);

    this.model.lastNumWord = listWords.length - 1;
    this.model.listWords.length = 0;
    this.model.listWords.push(...listWords);

    this.controllerApp.openPage(
      this.view.createPageWithWord(),
    );
  }

  public nextWord(): void {
    if (this.model.currentNumWord === this.model.lastNumWord) {
      resetKeyDownListener();
      this.view.showResults();
      this.sendStatistics.createStatistic();
      return;
    }

    this.model.applySettingsNextPage();

    this.controllerApp.openPage(
      this.view.createPageWithWord(),
    );
  }

  public changeDifficulty(difficulty: number): void {
    this.model.difficulty = difficulty;
  }

  public getVoice(): HTMLAudioElement {
    return new Audio(`${this.server.port}/${this.model.listWords[this.model.currentNumWord].audio}`);
  }

  public loadImage(): void {
    const img = createTag('div', CSSClass.gameAudioHeaderImg) as HTMLElement;
    img.style.backgroundImage = `url(${this.server.port}/${this.model.listWords[this.model.currentNumWord].image})`;
    this.img = img;
  }

  public wrongAnswer(block?: HTMLElement): void {
    this.model.wrongAnswers.push(this.model.listWords[this.model.currentNumWord]);
    this.model.isShowAnswer = true;

    this.model.serialCorrectAnswer = 0;

    const audio = new Audio(failSound);
    audio.play();
    this.view.addLineThroughWrongAnswer(block);
    this.view.dimLightAnswers(this.model.wrongAnswerOnPage);
    this.view.createHeaderRightAnswer();
    this.disabledListener();
    this.view.createButtonNextWord();
  }

  public rightAnswer(block: HTMLElement): void {
    this.model.rightAnswers.push(this.model.listWords[this.model.currentNumWord]);
    this.model.isShowAnswer = true;

    this.model.serialCorrectAnswer += 1;
    if (this.model.maxSerialCorrectAnswer < this.model.serialCorrectAnswer) {
      this.model.maxSerialCorrectAnswer = this.model.serialCorrectAnswer;
    }

    const audio = new Audio(successSound);
    audio.play();
    const numBlock = block.querySelector(`.${CSSClass.gameAudioAnswerNum}`);
    if (numBlock) {
      numBlock.innerHTML = '<img src = "./assets/svg/success.svg" alt = "succeed">';
    }

    this.view.dimLightAnswers(this.model.wrongAnswerOnPage);
    this.view.createHeaderRightAnswer();
    this.disabledListener();
    this.view.createButtonNextWord();
  }

  private disabledListener(): void {
    [this.model.rightAnswerOnPage, ...this.model.wrongAnswerOnPage].forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.style.pointerEvents = 'none';
    });
  }

  public addListener():void {
    document.body.onkeydown = (e):void => {
      switch (e.key) {
        case ' ':
          this.view.voiceImg.click();
          break;

        case 'Enter':
          this.view.buttonUnknown.click();
          break;

        default:
      }

      if (!this.model.isShowAnswer) {
        switch (e.key) {
          case '1':
            this.model.listAnswerOnPage[0].click();
            break;

          case '2':
            this.model.listAnswerOnPage[1].click();
            break;

          case '3':
            this.model.listAnswerOnPage[2].click();
            break;

          case '4':
            this.model.listAnswerOnPage[3].click();
            break;

          case '5':
            this.model.listAnswerOnPage[4].click();
            break;

          default:
        }
      }
    };
  }
}
