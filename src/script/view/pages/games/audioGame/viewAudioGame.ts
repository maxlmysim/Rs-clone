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

    blockHeader.append(this.createVoiceButtonAndStartPlay());

    const wrapperButton = createTag('div', CSSClass.gameAudioWrapperButton);
    const button = createTag('button', CSSClass.gameAudioButton, 'не знаю');
    button.onclick = ():void => this.controller.wrongAnswer();
    wrapperButton.append(button);

    gamePage.append(blockHeader, this.createBlockWithAnswer(), wrapperButton);
    wrapper.append(gamePage);
    return wrapper;
  }

  private createVoiceButtonAndStartPlay(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioButtonVoice);
    const voiceImg = createTag('img', CSSClass.gameAudioButtonVoiceImg) as HTMLImageElement;
    voiceImg.src = './assets/svg/voice.svg';
    voiceImg.alt = 'voice';

    const voice = this.controller.getVoice();
    voice.play();
    voiceImg.onclick = (): Promise<void> => voice.play();

    wrapper.append(voiceImg);
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
        contain.onclick = ():void => this.controller.rightAnswer();
      } else {
        contain.onclick = ():void => this.controller.wrongAnswer();
      }

      contain.append(num, word);
      answer.push(contain);
    }

    wrapper.append(...answer);
    return wrapper;
  }
}
