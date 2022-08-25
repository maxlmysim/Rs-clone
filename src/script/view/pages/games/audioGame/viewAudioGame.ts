import {
  createOptionListDifficulty, createSelect, createTag, getRandomItemFromArray,
} from '../../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../../interface/freeText';
import { Server } from '../../../../server/server';
import { ControllerAudioGame } from './controllerAudioGame';
import { modelAudioGame } from './modelAudioGame';
import { ModelAudioGame } from '../../../../interface/audioGame';

export class ViewAudioGame {
  private controller: ControllerAudioGame;

  private server: Server;

  private model: ModelAudioGame;

  public buttonUnknown!: HTMLElement;

  private blockHeader!: HTMLElement;

  private blockVoice!: HTMLElement;

  public constructor() {
    this.model = modelAudioGame;
    this.server = new Server();
    this.controller = new ControllerAudioGame(this);
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    const preview = createTag('div', CSSClass.gameAudioPreview);

    wrapper.style.backgroundImage = 'url(./assets/img/games/audioGame_background.svg)';
    const title = createTag('h3', CSSClass.gameAudioTitle, AudioGameText.name);

    preview.append(title, this.createDescriptionGame());
    wrapper.append(preview);
    return wrapper;
  }

  private createDescriptionGame():HTMLElement {
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
    button.onclick = ():void => this.controller.wrongAnswer();

    wrapperButton.append(button);

    gamePage.append(blockHeader, this.createBlockWithAnswer(), wrapperButton);
    wrapper.append(gamePage);

    this.controller.loadImage();

    return wrapper;
  }

  private createVoiceButtonAndPlayVoice(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioHeaderBottom);
    const blockVoice = createTag('div', CSSClass.gameAudioButtonVoice);
    this.blockVoice = blockVoice;
    const voiceImg = createTag('img', CSSClass.gameAudioButtonVoiceImg) as HTMLImageElement;
    voiceImg.src = './assets/svg/voice.svg';
    voiceImg.alt = 'voice';

    const voice = this.controller.getVoice();
    voice.play();
    voiceImg.onclick = (): Promise<void> => voice.play();

    blockVoice.append(voiceImg);
    wrapper.append(blockVoice);
    return wrapper;
  }

  private createBlockWithAnswer(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioAnswers);
    const answer: HTMLElement[] = [];

    const numRightAnswer = Math.floor(Math.random() * 5);
    for (let i = 0; i < 5; i += 1) {
      let wordInfo = getRandomItemFromArray(this.model.listWords, this.model.listWords[this.model.currentNumWord]);

      if (i === numRightAnswer) {
        wordInfo = this.model.listWords[this.model.currentNumWord];
      }
      const word = createTag('span', '', wordInfo.wordTranslate);
      const contain = createTag('div', CSSClass.gameAudioAnswer);
      const num = createTag('span', CSSClass.gameAudioAnswerNum, `${i + 1}`);

      if (i === numRightAnswer) {
        this.model.rightAnswer = contain;
        contain.onclick = ():void => this.controller.rightAnswer(contain);
      } else {
        this.model.wrongAnswer.push(contain);
        contain.onclick = ():void => this.controller.wrongAnswer(contain);
      }

      contain.append(num, word);
      answer.push(contain);
    }

    wrapper.append(...answer);
    return wrapper;
  }

  public dimLightAnswers(answers: HTMLElement[]): void {
    answers.forEach((item) => item.classList.add(CSSClass.dimLight));
  }

  public createHeaderRightAnswer():void {
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

  public createButtonNextWord():void {
    this.buttonUnknown.classList.add(CSSClass.fillGray, CSSClass.deleteBorder);
    this.buttonUnknown.innerHTML = '<img src = "./assets/svg/arrow-right.svg" alt = "next word">';
  }
}
