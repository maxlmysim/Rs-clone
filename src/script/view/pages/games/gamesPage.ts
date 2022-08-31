import { createTag } from '../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../interface/freeText';
import { ViewAudioGame } from '../../components/audioGame/viewAudioGame';
import { IdPages } from '../../../interface/typeApp';

export class GamesPage {
  private audioGame: ViewAudioGame;

  public constructor() {
    this.audioGame = new ViewAudioGame();
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gamesPage);

    const audioGame = this.createIcoGame(
      AudioGameText.name,
      'url(./assets/img/games/audioGame_background.svg)',
      IdPages.gameAudio,
    );

    wrapper.append(audioGame);
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
