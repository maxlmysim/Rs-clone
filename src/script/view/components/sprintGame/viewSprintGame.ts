import {
  createImg, createOptionListDifficulty, createSelect, createTag,
} from '../../../helper/helper';
import { SprintGameText, CSSClass } from '../../../interface/freeText';
import { Server } from '../../../server/server';
import { ControllerSprintGame } from './controllerSprintGame';
import { modelSprintGame } from './modelSprintGame';
import { ModelSprintGame } from '../../../interface/SprintGame';
import { Word } from '../../../interface/server';
import { ControllerApp } from '../../../controller/controller';
import { IdPages } from '../../../interface/typeApp';

export class ViewSprintGame {
  private controller: ControllerSprintGame;

  private server: Server;

  private model: ModelSprintGame;

  public buttonUnknown!: HTMLElement;

  private blockHeader!: HTMLElement;

  private blockVoice!: HTMLElement;

  public voiceImg!: HTMLElement;

  private gameSprintContainer!: HTMLElement;

  private controllerApp: ControllerApp;

  public constructor() {
    this.model = modelSprintGame;
    this.model.resetAll();
    this.server = new Server();
    this.controller = new ControllerSprintGame(this);
    this.controllerApp = new ControllerApp();
  }

  public init(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameSprint);
    const preview = createTag('div', CSSClass.gameSprintPreview);

    wrapper.style.backgroundImage = 'url(./assets/img/games/sprintGame_background.svg)';
    const title = createTag('h3', CSSClass.gameSprintTitle, SprintGameText.name);

    preview.append(title, this.createDescriptionGame(), this.createBlockWithStartButtons());
    wrapper.append(preview);

    this.gameSprintContainer = wrapper;
    return wrapper;
  }

  private createDescriptionGame(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameSprintDescriptionBlock);

    const description = createTag('h4', CSSClass.gameSprintDescription, SprintGameText.description);

    const listControlDescription = createTag('ul', CSSClass.gameSprintDescriptionControl);
    const contrMouseDescription = createTag('li', '', SprintGameText.descriptionControlMouse);
    const contrKeyDescription = createTag('li', '', SprintGameText.descriptionControlKey);

    listControlDescription.append(contrMouseDescription, contrKeyDescription);

    wrapper.append(description, listControlDescription);
    return wrapper;
  }

  private createBlockWithStartButtons(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameSprintBlockButtons);
    const startGameButton = createTag('button', CSSClass.gameSprintBlockButtonsStart, SprintGameText.startButton);

    startGameButton.onclick = (): Promise<void> => this.controller.loadWordsAndStartGame();

    const selectedDifficultyButton = createSelect(
      'difficulty',
      'selectDifficult',
      CSSClass.gameSprintBlockButtonsSelect,
      createOptionListDifficulty(6, this.model.difficulty),
    );

    selectedDifficultyButton
      .addEventListener('change', () => this.controller.changeDifficulty(+selectedDifficultyButton.value));

    const fieldset = createTag('fieldset', CSSClass.gameSprintBlockButtonsFieldset) as HTMLFieldSetElement;
    const legendFieldset = createTag('legend', '', 'Сложность') as HTMLLegendElement;
    fieldset.append(legendFieldset);

    const fieldsetBlock = createTag('div', CSSClass.gameSprintBlockButtonsFieldsetBlock);
    fieldsetBlock.append(fieldset, selectedDifficultyButton);

    wrapper.append(fieldsetBlock, startGameButton);
    return wrapper;
  }

  public createPageWithWord(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameSprint);
    const gamePage = createTag('div', CSSClass.gameSprintGame);

    wrapper.style.backgroundImage = 'url(./assets/img/games/sprintGame_background.svg)';

    const currentAccountBlock = createTag('div', CSSClass.gameSprintCurrentAccount);
    const currentAccountText = createTag('span', '', 'Текущий счет');
    const currentAccountNum = createTag('span', '', '0');
    currentAccountBlock.append(currentAccountText, currentAccountNum);

    gamePage.append(currentAccountBlock, this.createGameBlock());

    wrapper.append(gamePage);
    return wrapper;
  }

  private createGameBlock(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameWindow);

    const word = this.model.listWords[this.model.currentNumWord];

    const timerBlock = createTag('div', CSSClass.gameWindowTimerBlock);
    const correctAnswerCounter = createTag('div', CSSClass.gameWindowCorrectCounter);
    const englishWord = createTag('h3', CSSClass.gameWindowEnglishWord, word.word);
    const russianWord = createTag('h3', CSSClass.gameWindowRussianWord, word.wordTranslate);
    const hr = createTag('hr', '');

    wrapper.append(timerBlock, correctAnswerCounter, englishWord, russianWord, hr, this.createButtonsForGame());
    return wrapper;
  }

  private createButtonsForGame():HTMLElement {
    const buttonsContainer = createTag('div', CSSClass.gameWindowButtons);

    const correctButton = createTag('button', CSSClass.gameWindowCorrectButton);
    const arrowLeftForButton = createTag(
      'span',
      CSSClass.buttonArrow,
      '<img src = "./assets/svg/arrow-left.svg" alt = "Correct">',
    );
    const textForCorrectButton = createTag('span', '', 'верно');
    correctButton.append(arrowLeftForButton, textForCorrectButton);

    const incorrectButton = createTag('button', CSSClass.gameWindowIncorrectButton);
    const arrowRightForButton = createTag(
      'span',
      CSSClass.buttonArrow,
      '<img src = "./assets/svg/arrow-right.svg" alt = "Incorrect">',
    );
    const textForIncorrectButton = createTag('span', '', 'неверно');
    incorrectButton.append(textForIncorrectButton, arrowRightForButton);

    buttonsContainer.append(correctButton, incorrectButton);

    return buttonsContainer;
  }

  public showResults(): void {
    this.gameSprintContainer.innerHTML = '';
    this.gameSprintContainer.append(this.createResultBlock(), this.createButtonsForResult());
  }

  private createButtonsForResult(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameSprintResultButtons);

    const btnRestartGame = createTag('button', '', 'Играть еще');
    btnRestartGame.onclick = (): void => this.controllerApp.openPage(this.init());

    const btnGameList = createTag('button', '', 'К списку игр');
    btnGameList.onclick = (): void => {
      window.location.hash = IdPages.games;
    };

    wrapper.append(btnRestartGame, btnGameList);
    return wrapper;
  }

  private createResultBlock(): HTMLElement {
    const wrapper = createTag('div', [CSSClass.gameSprintResultBlock, CSSClass.resultBlock]);
    const title = createTag('h3', CSSClass.resultBlockTitle, 'Ваш результат');
    const rightAnswersBlock = this.createRightAnswersResult();
    const hr = createTag('hr', '');
    const wrongAnswersBlock = this.createWrongAnswersResult();

    wrapper.append(title, rightAnswersBlock, hr, wrongAnswersBlock);
    return wrapper;
  }

  private createRightAnswersResult(): HTMLElement {
    const wrapper = createTag('div', CSSClass.resultBlockRightAnswers);
    const title = createTag('h3', CSSClass.title, `Правильно: ${this.model.rightAnswers.length}`);
    wrapper.append(title);

    this.model.rightAnswers.forEach(((answer) => {
      wrapper.append(this.createResultWord(answer));
    }));

    return wrapper;
  }

  private createWrongAnswersResult(): HTMLElement {
    const wrapper = createTag('div', CSSClass.resultBlockWrongAnswers);
    const title = createTag('h3', CSSClass.title, `Ошибки: ${this.model.wrongAnswers.length}`);
    wrapper.append(title);

    this.model.wrongAnswers.forEach(((answer) => {
      wrapper.append(this.createResultWord(answer));
    }));

    return wrapper;
  }

  private createResultWord(wordResult: Word): HTMLElement {
    const wrapper = createTag('div', CSSClass.resultBlockAnswer);

    const voice = createImg('./assets/svg/voice.svg', CSSClass.resultBlockVoice, 'voice');
    voice.onclick = (): void => {
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
