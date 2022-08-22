import { createTag } from '../../helper/helper';
import { IdPages, NamePages } from '../../interface/typeApp';

export class MainPage {
  public create():HTMLElement {
    const wrapper = createTag('div', IdPages.main, '');
    const title = createTag('h1', 'main-page__title', 'RSLang');
    const text = createTag('p', 'main-page__text', 'Здесь текст с пожеланиями');
    const loginBtn = this.createBtn(NamePages.login, IdPages.login);
    const aboutProjectBtn = this.createBtn(NamePages.aboutProject, IdPages.aboutProject);
    wrapper.append(title, text, loginBtn, aboutProjectBtn);
    return wrapper;
  }

  private createBtn(name: string, idPage:string):HTMLElement {
    const wrapper = createTag('a', 'main-page__btn', name) as HTMLBaseElement;
    wrapper.href = `#${idPage}`;
    return wrapper;
  }
}
