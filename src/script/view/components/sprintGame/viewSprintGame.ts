import {
  createImg, createOptionListDifficulty, createSelect, createTag, resetKeyDownListener,
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

  private gameSprintContainer!: HTMLElement;

  private controllerApp: ControllerApp;

  private englishWord!: HTMLElement;

  private translateWord!: HTMLElement;

  private currentAccount!: HTMLElement;

  public correctButton!: HTMLElement;

  public incorrectButton!: HTMLElement;

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

  public createGame(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameSprint);
    const gamePage = createTag('div', CSSClass.gameSprintGame);
    this.gameSprintContainer = gamePage;

    wrapper.style.backgroundImage = 'url(./assets/img/games/sprintGame_background.svg)';

    const currentAccountBlock = createTag('div', CSSClass.gameSprintCurrentAccount);
    const currentAccountText = createTag('span', '', 'Текущий счет');
    const currentAccountNum = createTag('span', '', '0');
    this.currentAccount = currentAccountNum;
    currentAccountBlock.append(currentAccountText, currentAccountNum);

    gamePage.append(currentAccountBlock, this.createGameBlock());

    wrapper.append(gamePage);
    return wrapper;
  }

  private createGameBlock(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameWindow);
    const englishWord = createTag('h3', CSSClass.gameWindowEnglishWord, this.model.englishWord);
    const translateWord = createTag('h3', CSSClass.gameWindowRussianWord, this.model.translateWord);

    this.englishWord = englishWord;
    this.translateWord = translateWord;

    const hr = createTag('hr', '');

    wrapper.append(
      this.createTimer(),
      this.createCounterCorrectAnswer(),
      englishWord,
      translateWord,
      hr,
      this.createButtonsForGame(),
    );

    return wrapper;
  }

  private createCounterCorrectAnswer(): HTMLElement {
    const wrapper = createTag('div', CSSClass.gameWindowCorrectCounter);
    const circle = createTag('span', CSSClass.gameWindowCorrectCounterIcon);
    wrapper.append(circle, circle.cloneNode(), circle.cloneNode());
    return wrapper;
  }

  public addMarkToCounterCorrectAnswer(): void {
    const circles = document.querySelectorAll(`.${CSSClass.gameWindowCorrectCounterIcon}`);
    circles.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = '';
    });

    circles.forEach((item, index) => {
      if (index < this.model.serialCorrectAnswer) {
        const imgSucceed = createImg('./assets/svg/success.svg', '', 'succeed');
        item.append(imgSucceed);
      }
    });
  }

  public changeWordOnPage(): void {
    this.englishWord.innerHTML = this.model.englishWord;
    this.translateWord.innerHTML = this.model.translateWord;
  }

  public changeCurrentAccount(): void {
    this.currentAccount.innerHTML = `${this.model.account}`;
  }

  private createButtonsForGame(): HTMLElement {
    const buttonsContainer = createTag('div', CSSClass.gameWindowButtons);

    const correctButton = createTag('button', CSSClass.gameWindowCorrectButton);
    const arrowLeftForButton = createTag(
      'span',
      CSSClass.buttonArrow,
      '<img src = "./assets/svg/arrow-left.svg" alt = "Correct">',
    );
    const textForCorrectButton = createTag('span', '', 'верно');
    correctButton.append(arrowLeftForButton, textForCorrectButton);
    correctButton.onclick = (): void => this.controller.checkAnswer(true);
    this.correctButton = correctButton;

    const incorrectButton = createTag('button', CSSClass.gameWindowIncorrectButton);
    const arrowRightForButton = createTag(
      'span',
      CSSClass.buttonArrow,
      '<img src = "./assets/svg/arrow-right.svg" alt = "Incorrect">',
    );
    const textForIncorrectButton = createTag('span', '', 'неверно');
    incorrectButton.append(textForIncorrectButton, arrowRightForButton);
    incorrectButton.onclick = (): void => this.controller.checkAnswer(false);
    this.incorrectButton = incorrectButton;

    buttonsContainer.append(correctButton, incorrectButton);

    return buttonsContainer;
  }

  private createTimer(): HTMLElement {
    const wrapper = createTag('div', [CSSClass.gameWindowTimerBlock, CSSClass.timerBlock]);

    const timeCaption = createTag('h3', '', '0');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.classList.add(CSSClass.timerBlockCircle);
    circle.setAttributeNS(null, 'cx', '25');
    circle.setAttributeNS(null, 'cy', '25');
    circle.setAttributeNS(null, 'r', '20');
    circle.setAttributeNS(null, 'stroke-width', '4');
    circle.setAttributeNS(null, 'fill', 'none');
    svg.append(circle);

    const time = 60;
    let i = 0;
    const finalOffset = 125;
    const step = finalOffset / time;
    const circleStyle = circle.style;

    circleStyle.strokeDasharray = `${finalOffset}`;
    circleStyle.strokeDashoffset = '0';
    timeCaption.innerText = `${time}`;

    const interval = setInterval(() => {
      timeCaption.innerText = `${time - i}`;
      i += 1;
      if (i > time) {
        clearInterval(interval);
        resetKeyDownListener();
        this.showResults();
      } else {
        circleStyle.strokeDashoffset = `${step * i}`;
      }
    }, 1000);

    wrapper.append(timeCaption, svg);
    return wrapper;
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
    const title = createTag('h3', CSSClass.resultBlockTitle, `Количество очков: ${this.model.account} `);
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
