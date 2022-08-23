import {
  createOptionListDifficulty, createSelect, createTag,
} from '../../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../../interface/freeText';
import { Word } from '../../../../interface/server';
import { Server } from '../../../../server/server';
import { ControllerAudioGame } from './controllerAudioGame';
import { modelAudioGame } from './modelAudioGame';

export class ViewAudioGame {
  private controller: ControllerAudioGame;

  private server: Server;

  public constructor(difficulty = 2) {
    modelAudioGame.difficulty = difficulty;
    this.server = new Server();
    this.controller = new ControllerAudioGame(this);
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    wrapper.style.backgroundImage = 'url(./assets/img/games/audioGame_background.svg)';
    const title = createTag('h3', CSSClass.gameAudioTitle, AudioGameText.name);

    wrapper.append(title, this.createDescriptionGame());
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
      createOptionListDifficulty(6, modelAudioGame.difficulty),
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

  public createPageWithWord(word: Word): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    wrapper.style.backgroundImage = 'url(./assets/img/games/audioGame_background.svg)';
    const blockHeader = createTag('div', CSSClass.gameAudioHeader);
    console.log(word);
    const voice = createTag('img', CSSClass.gameAudioButtonVoice) as HTMLImageElement;
    voice.src = './assets/svg/voice.svg';
    voice.alt = 'voice';
    voice.onclick = (): Promise<void> => this.controller.playVoice();
    blockHeader.append(voice);

    const answerContainer = createTag('div', CSSClass.gameAudioAnswers);
    const button = createTag('button', CSSClass.gameAudioButton, 'не знаю');

    wrapper.append(blockHeader, answerContainer, button);
    return wrapper;
  }
}
