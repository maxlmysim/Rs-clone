import { createTag } from '../../../helper/helper';
import { AudioGameText, CSSClass, SprintGameText } from '../../../interface/freeText';
import { ViewAudioGame } from '../../components/audioGame/viewAudioGame';
import { IdPages } from '../../../interface/typeApp';

export class GamesPage {
  private audioGame: ViewAudioGame;

  public constructor() {
    this.audioGame = new ViewAudioGame();
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gamesPage);
    wrapper.style.backgroundImage = 'url(./assets/img/gamePageBackground.jpg)';

    const audioGame = this.createIcoGame(
      AudioGameText.name,
      'url(./assets/img/games/audioGame_background.svg)',
      IdPages.gameAudio,
    );

    const sprintGame = this.createIcoGame(
      SprintGameText.name,
      'url(./assets/img/games/sprintGame_background.svg)',
      IdPages.gameSprint,
    );

    wrapper.append(audioGame, sprintGame);
    return wrapper;
  }

  private createIcoGame(nameGame: string, urlImg: string, hash: string): HTMLElement {
    const game = createTag(
      'div',
      CSSClass.gamesPageGame,
    );
    game.style.backgroundImage = urlImg;

    const name = createTag('p', CSSClass.gamesPageGameName, nameGame);
    game.append(name);

    game.onclick = (): void => {
      window.location.hash = hash;
    };
    return game;
  }
}
