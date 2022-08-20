import { createTag } from '../../helper/helper';

export class Main {
  public create():HTMLElement {
    const main: HTMLElement = createTag('main', 'main', '');
    const wrapper: HTMLElement = createTag('div', 'main-wrapper', '');
    main.append(wrapper);
    return main;
  }
}
