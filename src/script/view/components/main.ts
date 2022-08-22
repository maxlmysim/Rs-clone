import { createTag } from '../../helper/helper';
import { Navigation } from './mainNavigation';
import { MainPage } from '../pages/mainPage';

export class Main {
  public create():HTMLElement {
    const main: HTMLElement = createTag('main', 'main', '');
    const wrapper: HTMLElement = createTag('div', 'main-wrapper', '');
    const wrapperMain = createTag('div', 'main-container', '');
    wrapperMain.append(new MainPage().create());
    wrapper.append(new Navigation().creat(), wrapperMain);
    main.append(wrapper);
    return main;
  }
}
