import { createTag } from '../../helper/helper';
import { Navigation } from './mainNavigation';
import { MainPage } from '../pages/mainPage/mainPage';
import { CSSClass } from '../../interface/freeText';

export class Main {
  public create():HTMLElement {
    const main: HTMLElement = createTag('main', CSSClass.main);
    const wrapper: HTMLElement = createTag('div', CSSClass.mainWrapper);
    const wrapperMain = createTag('div', CSSClass.mainContainer);
    wrapperMain.append(new MainPage().create());
    wrapper.append(new Navigation().creat(), wrapperMain);
    main.append(wrapper);
    return main;
  }
}
