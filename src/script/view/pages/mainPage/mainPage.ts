import { createTag } from '../../../helper/helper';
import { IdPages, NamePages } from '../../../interface/typeApp';
import { CSSClass, MainPageText } from '../../../interface/freeText';

export class MainPage {
  public create():HTMLElement {
    const wrapper = createTag('div', IdPages.main, '');
    const title = createTag('h1', CSSClass.mainPageTitle, MainPageText.mainPageTitle);
    const text = createTag('p', CSSClass.mainPageText, MainPageText.mainPageText);
    const loginBtn = this.createBtn(NamePages.login, IdPages.login);
    const aboutProjectBtn = this.createBtn(NamePages.aboutProject, IdPages.aboutProject);
    wrapper.append(title, text, loginBtn, aboutProjectBtn);
    return wrapper;
  }

  private createBtn(name: string, idPage:string):HTMLElement {
    const wrapper = createTag('a', CSSClass.mainPageBtn, name) as HTMLBaseElement;
    wrapper.href = `#${idPage}`;
    return wrapper;
  }
}
