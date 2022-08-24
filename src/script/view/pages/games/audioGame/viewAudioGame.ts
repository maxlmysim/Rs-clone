import {
  createOptionListDifficulty, createSelect, createTag, getRandomItemFromArray, shuffleWordList,
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

    for (let i = 0; i < 4; i += 1) {
      const word = getRandomItemFromArray(this.model.listWords, this.model.listWords[this.model.currentNumWord]);
      const wordWrong = createTag('span', CSSClass.gameAudioAnswer, word.wordTranslate);
      wordWrong.onclick = ():void => this.controller.wrongAnswer();
      answer.push(wordWrong);
    }

    const rightWord = createTag(
      'span',
      CSSClass.gameAudioAnswer,
      this.model.listWords[this.model.currentNumWord].wordTranslate,
    );
    rightWord.onclick = ():void => this.controller.rightAnswer();
    answer.push(rightWord);

    shuffleWordList(answer);

    answer.forEach((item, index) => {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = `${index + 1} ${item.innerText}`;
    });

    wrapper.append(...answer);
    return wrapper;
  }

  // public createPageWithRightAnswer(): HTMLElement {
  //
  // }
}
