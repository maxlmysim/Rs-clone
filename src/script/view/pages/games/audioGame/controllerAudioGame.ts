import { ControllerApp } from '../../../../controller/controller';
import { createTag, shuffleWordList } from '../../../../helper/helper';
import { Server } from '../../../../server/server';
import { modelAudioGame } from './modelAudioGame';
import { ViewAudioGame } from './viewAudioGame';
import { ModelAudioGame } from '../../../../interface/audioGame';
import successSound from '../../../../../assets/sounds/correct.mp3';
import failSound from '../../../../../assets/sounds/wrong.mp3';
import { CSSClass } from '../../../../interface/freeText';
import { Word } from '../../../../interface/server';

export class ControllerAudioGame {
  private controllerApp: ControllerApp;

  private server: Server;

  private view: ViewAudioGame;

  private model: ModelAudioGame;

  public img!: HTMLElement;

  public constructor(view: ViewAudioGame) {
    this.controllerApp = new ControllerApp();
    this.server = new Server();
    this.view = view;
    this.model = modelAudioGame;
  }

  public async loadWordsAndStartGame(list?: Word[]): Promise<void> {
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
      this.model.currentNumWord = 0;
      console.log('end');
      console.log(this.model);
      return;
    }
    this.model.currentNumWord += 1;
    this.model.wrongAnswerOnPage.length = 0;
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
    const audio = new Audio(failSound);
    audio.play();
    this.view.addLineThroughWrongAnswer(block);
    this.view.dimLightAnswers(this.model.wrongAnswerOnPage);
    this.view.createHeaderRightAnswer();
    this.disabledListener();
    this.view.createButtonNextWord();
  }

  public rightAnswer(block: HTMLElement): void {
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
}
