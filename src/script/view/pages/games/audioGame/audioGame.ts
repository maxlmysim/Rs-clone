import { createTag } from '../../../../helper/helper';
import { CSSClass } from '../../../../interface/freeText';

export class AudioGame {
  public constructor() {
    console.log('start');
  }

  public init():HTMLElement {
    const wrapper = createTag('div', CSSClass.gameAudio);
    wrapper.style.backgroundImage = 'url(./assets/img/games/savanna_background.svg)';
    return wrapper;
  }
}
