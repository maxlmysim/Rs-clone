import { createImg, createTag } from '../../helper/helper';
import { IdPages } from '../../interface/typeApp';
import { logoutUser, userInfo } from '../../authorization/user';
import { CSSClass, HTMLPageFreeText } from '../../interface/freeText';

export class Header {
  public create():HTMLElement {
    const header: HTMLElement = createTag('header', CSSClass.header);
    const wrapper: HTMLElement = createTag('div', CSSClass.headerWrapper);
    const logo: HTMLElement = createTag('div', CSSClass.headerLogo, HTMLPageFreeText.headerLogo);
    logo.addEventListener('click', () => { window.location.hash = IdPages.main; });
    wrapper.append(this.burger(), logo, this.authorization());
    header.append(wrapper);
    return header;
  }

  public burger():HTMLElement {
    const burgerSVG: HTMLElement = createTag('div', CSSClass.headerSVG);
    burgerSVG.innerHTML = '<img src = "./assets/svg/menuBurger.svg" alt = "burger">';
    const burger: HTMLElement = createTag('div', CSSClass.headerBurger);
    burger.append(burgerSVG);
    burger.addEventListener('click', (event: Event) => this.openMenu(event));
    return burger;
  }

  public authorization():HTMLElement {
    const authorization: HTMLElement = createTag('div', CSSClass.headerAuthorization);
    const authorizationButton = createTag('a', CSSClass.authorizationLogo) as HTMLBaseElement;
    if (userInfo.login) {
      const img = createImg('./assets/svg/logout.svg', CSSClass.authorizationSVG, 'logOut');
      authorizationButton.append(img);
      authorizationButton.href = `#${IdPages.login}`;
      authorization.onclick = (): void => logoutUser();
    } else {
      const img = createImg('./assets/svg/Login.svg', CSSClass.authorizationSVG, 'logIn');
      authorizationButton.append(img);
      authorizationButton.href = `#${IdPages.login}`;
    }
    authorization.append(authorizationButton);
    return authorization;
  }

  private openMenu(event: Event):void {
    const burger = event.currentTarget as HTMLElement;
    const header = document.querySelector(`.${CSSClass.header}`) as HTMLElement;
    const headerLogo = document.querySelector(`.${CSSClass.headerLogo}`) as HTMLElement;
    const closeBurger = document.querySelector(`.${CSSClass.closeBurger}`) as HTMLElement;
    const mainContainer = document.querySelector(`.${CSSClass.mainContainer}`) as HTMLElement;
    burger.style.display = 'none';
    closeBurger.style.display = 'flex';
    headerLogo.style.margin = 'auto auto auto 1rem';
    header.classList.add(CSSClass.headerShift);
    mainContainer.classList.add(CSSClass.mainContainerShift);
  }
}
