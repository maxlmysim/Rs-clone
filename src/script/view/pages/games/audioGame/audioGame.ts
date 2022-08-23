import { createOptionListDifficulty, createSelect, createTag } from '../../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../../interface/freeText';

export class AudioGame {
  private difficulty: number;

  public constructor() {
    this.difficulty = 2;
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    wrapper.style.backgroundImage = 'url(./assets/img/games/savanna_background.svg)';
    const title = createTag('h3', CSSClass.gameAudioTitle, AudioGameText.name);

    wrapper.append(title, this.createDescriptionGame());
    return wrapper;
  }

  private createDescriptionGame():HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudioDescriptionBlock);

    const description = createTag('h4', CSSClass.gameAudioDescription, AudioGameText.description);

    const listControlDescription = createTag('ul', CSSClass.gameAudioDescriptionControl, AudioGameText.description);
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
    const wrapper = createTag('div', '');
    const startGameButton = createTag('button', '', AudioGameText.startButton);
    startGameButton.onclick = (): void => console.log(this.difficulty);

    const selectedDifficultyButton = createSelect(
      'difficulty',
      '',
      '',
      createOptionListDifficulty(6, this.difficulty),
    );
    selectedDifficultyButton.addEventListener('change', () => {
      this.difficulty = +selectedDifficultyButton.value;
    });

    wrapper.append(selectedDifficultyButton, startGameButton);
    return wrapper;
  }
}
