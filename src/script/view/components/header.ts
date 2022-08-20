import { createTag } from '../../helper/helper';

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
    const autorizationSVG: HTMLElement = createTag('div', 'header-svg', '');
    autorizationSVG.innerHTML = '<img src = "./assets/svg/Login.svg" alt = "login">';
    const autorization: HTMLElement = createTag('div', 'header__autorization', '');
    autorization.append(autorizationSVG);
    return autorization;
  }
}
