import { createTag } from '../../helper/helper';
import { IdPages } from '../../interface/typeApp';
import { logoutUser, userInfo } from '../../authorization/user';

export class Header {
  public create():HTMLElement {
    const header: HTMLElement = createTag('header', 'header', '');
    const wrapper: HTMLElement = createTag('div', 'header-wrapper', '');
    const logo: HTMLElement = createTag('div', 'header__logo', 'RSlang');
    wrapper.append(this.burger(), logo, this.autorization());
    header.append(wrapper);
    return header;
  }

  public burger():HTMLElement {
    const burgerSVG: HTMLElement = createTag('div', 'header-svg', '');
    burgerSVG.innerHTML = '<img src = "./assets/svg/menuBurger.svg" alt = "burger">';
    const burger: HTMLElement = createTag('div', 'header__burger', '');
    burger.append(burgerSVG);
    return burger;
  }

  public autorization():HTMLElement {
    const autorization: HTMLElement = createTag('div', 'header__autorization', '');
    const autorizationSVG = createTag('a', 'header-svg') as HTMLBaseElement;
    if (!userInfo.login) {
      autorizationSVG.innerHTML = '<img src = "./assets/svg/Login.svg" alt = "login">';
      autorizationSVG.href = `#${IdPages.login}`;
    } else {
      autorizationSVG.innerHTML = '<img src = "./assets/svg/logout.svg" alt = "logOut">';
      autorization.onclick = (): void => logoutUser();
    }
    autorization.append(autorizationSVG);
    return autorization;
  }
}
