import {
  createImg,
  createOptionListDifficulty, createSelect, createTag, getRandomItemFromArray,
} from '../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../interface/freeText';
import { Server } from '../../../server/server';
import { ControllerAudioGame } from './controllerAudioGame';
import { modelAudioGame } from './modelAudioGame';
import { ModelAudioGame } from '../../../interface/audioGame';
import { Word } from '../../../interface/server';
import { ControllerApp } from '../../../controller/controller';
import { IdPages } from '../../../interface/typeApp';

export class ViewAudioGame {
  private controller: ControllerAudioGame;

  private server: Server;

  private model: ModelAudioGame;

  public buttonUnknown!: HTMLElement;

  private blockHeader!: HTMLElement;

  private blockVoice!: HTMLElement;

  public voiceImg!: HTMLElement;

  private gameAudioContainer!: HTMLElement;

  private controllerApp: ControllerApp;

  public constructor() {
    this.model = modelAudioGame;
    this.model.resetAll();
    this.server = new Server();
    this.controller = new ControllerAudioGame(this);
    this.controllerApp = new ControllerApp();
  }

  public init(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    const preview = createTag('div', CSSClass.gameAudioPreview);

    wrapper.style.backgroundImage = 'url(./assets/img/games/audioGame_background.svg)';
    const title = createTag('h3', CSSClass.gameAudioTitle, AudioGameText.name);

    preview.append(title, this.createDescriptionGame());
    wrapper.append(preview);

    this.gameAudioContainer = wrapper;
    return wrapper;
  }

  private createDescriptionGame(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioDescriptionBlock);

    const description = createTag('h4', CSSClass.gameAudioDescription, AudioGameText.description);

    const listControlDescription = createTag('ul', CSSClass.gameAudioDescriptionControl);
    const contrMouseDescription = createTag('li', '', AudioGameText.descriptionControlMouse);
    const contrKeyDescription = createTag('li', '', AudioGameText.descriptionControlKey);
    const contrReplayDescription = createTag('li', '', AudioGameText.descriptionControlReplayingVoice);
    const contrHintDescription = createTag('li', '', AudioGameText.descriptionControlHint);
    listControlDescription
      .append(contrMouseDescription, contrKeyDescription, contrReplayDescription, contrHintDescription);

    wrapper.append(description, listControlDescription, this.createBlockWithStartButtons());
    return wrapper;
  }

  private createBlockWithStartButtons(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioBlockButtons);
    const startGameButton = createTag('button', CSSClass.gameAudioBlockButtonsStart, AudioGameText.startButton);

    startGameButton.onclick = (): Promise<void> => this.controller.loadWordsAndStartGame();

    const selectedDifficultyButton = createSelect(
      'difficulty',
      'selectDifficult',
      CSSClass.gameAudioBlockButtonsSelect,
      createOptionListDifficulty(6, this.model.difficulty),
    );

    selectedDifficultyButton
      .addEventListener('change', () => this.controller.changeDifficulty(+selectedDifficultyButton.value));

    const fieldset = createTag('fieldset', CSSClass.gameAudioBlockButtonsFieldset) as HTMLFieldSetElement;
    const legendFieldset = createTag('legend', '', 'Сложность') as HTMLLegendElement;
    fieldset.append(legendFieldset);

    const fieldsetBlock = createTag('div', CSSClass.gameAudioBlockButtonsFieldsetBlock);
    fieldsetBlock.append(fieldset, selectedDifficultyButton);

    wrapper.append(fieldsetBlock, startGameButton);
    return wrapper;
  }

  public createPageWithWord(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    const gamePage = createTag('div', CSSClass.gameAudioGame);

    wrapper.style.backgroundImage = 'url(./assets/img/games/audioGame_background.svg)';
    const blockHeader = createTag('div', CSSClass.gameAudioHeader);
    this.blockHeader = blockHeader;
    blockHeader.append(this.createVoiceButtonAndPlayVoice());

    const wrapperButton = createTag('div', CSSClass.gameAudioWrapperButton);
    const button = createTag('button', CSSClass.gameAudioButton, 'не знаю');
    this.buttonUnknown = button;

    button.onclick = (): void => this.controller.wrongAnswer();

    wrapperButton.append(button);

    gamePage.append(blockHeader, this.createBlockWithAnswer(), wrapperButton);
    wrapper.append(gamePage);

    this.controller.loadImage();

    this.gameAudioContainer = wrapper;
    return wrapper;
  }

  private createVoiceButtonAndPlayVoice(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioHeaderBottom);
    const blockVoice = createTag('div', CSSClass.gameAudioButtonVoice);
    this.blockVoice = blockVoice;
    const voiceImg = createTag('img', CSSClass.gameAudioButtonVoiceImg) as HTMLImageElement;
    voiceImg.src = './assets/svg/voice.svg';
    voiceImg.alt = 'voice';
    this.voiceImg = voiceImg;

    const voice = this.controller.getVoice();
    voice.play();
    voiceImg.onclick = ():Promise<void> => voice.play();

    blockVoice.append(voiceImg);
    wrapper.append(blockVoice);
    return wrapper;
  }

  private createBlockWithAnswer(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioAnswers);
    const answer: HTMLElement[] = [];

    const numRightAnswer = Math.floor(Math.random() * 5);

    const forCheckRepeat: Set<Word> = new Set();
    forCheckRepeat.add(this.model.listWords[this.model.currentNumWord]);

    for (let i = 0; i < 5; i += 1) {
      let wordInfo = getRandomItemFromArray(
        this.model.listWords,
        forCheckRepeat,
      );

      forCheckRepeat.add(wordInfo);

      if (i === numRightAnswer) {
        wordInfo = this.model.listWords[this.model.currentNumWord];
      }
      const word = createTag('span', '', wordInfo.wordTranslate);
      const contain = createTag('div', CSSClass.gameAudioAnswer);
      const num = createTag('span', CSSClass.gameAudioAnswerNum, `${i + 1}`);

      this.model.listAnswerOnPage.push(contain);

      if (i === numRightAnswer) {
        this.model.rightAnswerOnPage = contain;
        contain.onclick = (): void => this.controller.rightAnswer(contain);
      } else {
        this.model.wrongAnswerOnPage.push(contain);
        contain.onclick = (): void => this.controller.wrongAnswer(contain);
      }

      contain.append(num, word);
      answer.push(contain);
    }

    this.controller.addListener();

    wrapper.append(...answer);
    return wrapper;
  }

  public dimLightAnswers(answers: HTMLElement[]): void {
    answers.forEach((item) => item.classList.add(CSSClass.dimLight));
  }

  public createHeaderRightAnswer(): void {
    const answerWords = createTag('span', '', this.model.listWords[this.model.currentNumWord].word);
    this.blockVoice.after(answerWords);
    this.blockVoice.classList.add(CSSClass.rightAnswer);

    this.blockHeader.append(this.controller.img);
  }

  public addLineThroughWrongAnswer(block?: HTMLElement): void {
    if (block) {
      block.classList.add(CSSClass.lineThrough);
    }
  }

  public createButtonNextWord(): void {
    this.buttonUnknown.classList.add(CSSClass.fillGray, CSSClass.deleteBorder);
    this.buttonUnknown.innerHTML = '<img src = "./assets/svg/arrow-right.svg" alt = "next word">';
    this.buttonUnknown.onclick = (): void => this.controller.nextWord();
  }

  public showResults():void {
    this.gameAudioContainer.innerHTML = '';
    this.gameAudioContainer.append(this.createResultBlock(), this.createButtonsForResult());
  }

  private createButtonsForResult():HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioResultButtons);

    const btnRestartGame = createTag('button', '', 'Играть еще');
    btnRestartGame.onclick = ():void => this.controllerApp.openPage(this.init());

    const btnGameList = createTag('button', '', 'К списку игр');
    btnGameList.onclick = ():void => {
      window.location.hash = IdPages.games;
    };

    wrapper.append(btnRestartGame, btnGameList);
    return wrapper;
  }

  private createResultBlock():HTMLElement {
    const wrapper = createTag('div', [CSSClass.gameAudioResultBlock, CSSClass.resultBlock]);
    const title = createTag('h3', CSSClass.resultBlockTitle, 'Ваш результат');
    const rightAnswersBlock = this.createRightAnswersResult();
    const hr = createTag('hr', '');
    const wrongAnswersBlock = this.createWrongAnswersResult();

    wrapper.append(title, rightAnswersBlock, hr, wrongAnswersBlock);
    return wrapper;
  }

  private createRightAnswersResult():HTMLElement {
    const wrapper = createTag('div', CSSClass.resultBlockRightAnswers);
    const title = createTag('h3', CSSClass.title, `Правильно: ${this.model.rightAnswers.length}`);
    wrapper.append(title);

    this.model.rightAnswers.forEach(((answer) => {
      wrapper.append(this.createResultWord(answer));
    }));

    return wrapper;
  }

  private createWrongAnswersResult():HTMLElement {
    const wrapper = createTag('div', CSSClass.resultBlockWrongAnswers);
    const title = createTag('h3', CSSClass.title, `Ошибки: ${this.model.wrongAnswers.length}`);
    wrapper.append(title);

    this.model.wrongAnswers.forEach(((answer) => {
      wrapper.append(this.createResultWord(answer));
    }));

    return wrapper;
  }

  private createResultWord(wordResult: Word):HTMLElement {
    const wrapper = createTag('div', CSSClass.resultBlockAnswer);

    const voice = createImg('./assets/svg/voice.svg', CSSClass.resultBlockVoice, 'voice');
    voice.onclick = ():void => {
      new Audio(`${this.server.port}/${wordResult.audio}`).play();
    };

    const word = createTag('div', '');
    const english = createTag('span', CSSClass.resultBlockEnglishWord, wordResult.word);
    const dash = createTag('span', '', '  -  ');
    const russian = createTag('span', '', wordResult.wordTranslate);
    word.append(english, dash, russian);

    wrapper.append(voice, word);
    return wrapper;
  }
}
