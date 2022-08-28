import { createTag } from '../../../helper/helper';
import { IdPages, NamePages } from '../../../interface/typeApp';
import { CSSClass, MainPageText } from '../../../interface/freeText';
import { userInfo } from '../../../authorization/user';

export class MainPage {
  public create():HTMLElement {
    console.log('mainPage', userInfo.login);
    const wrapper = createTag('div', IdPages.main, '');
    const title = createTag('h1', CSSClass.mainPageTitle, MainPageText.mainPageTitle);
    if (!userInfo.login) {
      const text = createTag('p', CSSClass.mainPageText, MainPageText.mainPageText);
      const loginBtn = this.createBtn(NamePages.login, IdPages.login);
      const aboutProjectBtn = this.createBtn(NamePages.aboutProject, IdPages.aboutProject);
      wrapper.append(title, text, loginBtn, aboutProjectBtn);
    } else {
      const text = createTag('p', CSSClass.mainPageText, MainPageText.mainPageTextForUser);
      const aboutProjectBtn = this.createBtn(NamePages.aboutProject, IdPages.aboutProject);
      wrapper.append(title, text, aboutProjectBtn);
    }
    userInfo.login = false;
    return wrapper;
  }

  private createBtn(name: string, idPage:string):HTMLElement {
    const wrapper = createTag('a', CSSClass.mainPageBtn, name) as HTMLBaseElement;
    wrapper.href = `#${idPage}`;
    return wrapper;
  }
}
