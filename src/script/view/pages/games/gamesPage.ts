import { createTag } from '../../../helper/helper';
import { AudioGameText, CSSClass } from '../../../interface/freeText';
import { ViewAudioGame } from './audioGame/viewAudioGame';

export class GamesPage {
  private audioGame: ViewAudioGame;

  public constructor() {
    this.audioGame = new ViewAudioGame();
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gamesPage);
    const audioGame = this.createIcoGame(
      wrapper,
      AudioGameText.name,
      'url(./assets/img/games/audioGame_background.svg)',
      this.audioGame.init(),
    );
    wrapper.append(audioGame);
    return wrapper;
  }

  private createIcoGame(wrapper: HTMLElement, nameGame: string, urlImg: string, gameHTML: HTMLElement): HTMLElement {
    const game = createTag(
      'div',
      CSSClass.gamesPageGame,
    );
    game.style.backgroundImage = urlImg;

    const name = createTag('p', CSSClass.gamesPageGameName, nameGame);
    game.append(name);

    game.onclick = (): void => {
      Array.from(wrapper.children).forEach((item) => item.remove());
      wrapper.append(gameHTML);
    };
    return game;
  }
}
