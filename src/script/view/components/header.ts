import { createTag } from '../../helper/helper';
import { IdPages } from '../../interface/typeApp';
import { logoutUser, userInfo } from '../../authorization/user';
import { CSSClass, HTMLPageFreeText } from '../../interface/freeText';

export class Header {
  public create():HTMLElement {
    const header: HTMLElement = createTag('header', CSSClass.header);
    const wrapper: HTMLElement = createTag('div', CSSClass.headerWrapper);
    const logo: HTMLElement = createTag('div', CSSClass.headerLogo, HTMLPageFreeText.heagerLogo);
    logo.addEventListener('click', () => { window.location.hash = IdPages.main; });
    wrapper.append(this.burger(), logo, this.autorization());
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

  public autorization():HTMLElement {
    const autorization: HTMLElement = createTag('div', CSSClass.headerAutorization);
    const autorizationSVG = createTag('a', CSSClass.headerSVG) as HTMLBaseElement;
    if (!userInfo.login) {
      autorizationSVG.innerHTML = '<img src = "./assets/svg/Login.svg" alt = "login">';
      autorizationSVG.href = `#${IdPages.login}`;
    } else {
      autorizationSVG.innerHTML = '<img src = "./assets/svg/logout.svg" alt = "logOut">';
      autorizationSVG.href = `#${IdPages.login}`;
      autorization.onclick = (): void => logoutUser();
    }
    autorization.append(autorizationSVG);
    return autorization;
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
