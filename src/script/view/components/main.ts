import { createTag } from '../../helper/helper';
import { Navigation } from './mainNavigation';
import { MainPage } from '../pages/mainPage';

export class Main {
  public create():HTMLElement {
    const main: HTMLElement = createTag('main', 'main', '');
    const wrapper: HTMLElement = createTag('div', 'main-wrapper', '');
    wrapper.append(new Navigation().creat(), new MainPage().create());
    main.append(wrapper);
    return main;
  }
}
