import { createOptionListDifficulty, createSelect, createTag } from '../../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../../interface/freeText';
import { ControllerApp } from '../../../../controller/controller';

export class AudioGame {
  private difficulty: number;

  private currentNumWord: number;

  private controller: ControllerApp;

  public constructor(difficulty = 2) {
    this.controller = new ControllerApp();
    this.difficulty = difficulty;
    this.currentNumWord = 0;
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
    startGameButton.onclick = (): void => this.controller.openPage(this.initGame());

    const selectedDifficultyButton = createSelect(
      'difficulty',
      'selectDifficult',
      CSSClass.gameAudioBlockButtonsSelect,
      createOptionListDifficulty(6, this.difficulty),
    );

    selectedDifficultyButton.addEventListener('change', () => {
      this.difficulty = +selectedDifficultyButton.value;
    });

    const fieldset = createTag('fieldset', CSSClass.gameAudioBlockButtonsFieldset) as HTMLFieldSetElement;
    const legendFieldset = createTag('legend', '', 'Сложность') as HTMLLegendElement;
    fieldset.append(legendFieldset);

    const fieldsetBlock = createTag('div', CSSClass.gameAudioBlockButtonsFieldsetBlock);
    fieldsetBlock.append(fieldset, selectedDifficultyButton);

    wrapper.append(fieldsetBlock, startGameButton);
    return wrapper;
  }

  private initGame(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    wrapper.style.backgroundImage = 'url(./assets/img/games/audioGame_background.svg)';

    return wrapper;
  }
}
