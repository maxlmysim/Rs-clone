import { createTag } from '../../helper/helper';
import { IdPages, NamePages } from '../../interface/typeApp';
import { CSSClass } from '../../interface/freeText';
import { ButtonAnimation } from '../../helper/buttonAnimation';

export class Navigation {
  public creat():HTMLElement {
    const wrapper = createTag('div', CSSClass.navItems);
    const svg = '<img src = "./assets/svg/closeBurger.svg">';
    const closeBurger = createTag('div', CSSClass.closeBurger, svg);
    const main = this.createItem(NamePages.main, IdPages.main, `./assets/svg/${IdPages.main}.svg`);
    const ebook = this.createItem(NamePages.ebook, IdPages.ebook, `./assets/svg/${IdPages.ebook}.svg`);
    const dictionary = this.createItem(
      NamePages.dictionary,
      IdPages.dictionary,
      `./assets/svg/${IdPages.dictionary}.svg`,
    );
    const games = this.createItem(NamePages.games, IdPages.games, `./assets/svg/${IdPages.games}.svg`);
    const statistics = this.createItem(
      NamePages.statistics,
      IdPages.statistics,
      `./assets/svg/${IdPages.statistics}.svg`,
    );
    const about = this.createItem(NamePages.aboutTeam, IdPages.aboutTeam, `./assets/svg/${IdPages.aboutTeam}.svg`);
    const review = this.createItem(NamePages.review, IdPages.review, `./assets/svg/${IdPages.review}.svg`);
    const buttons = [main, ebook, dictionary, games, statistics, about, review];
    wrapper.append(closeBurger, ...buttons);
    buttons.forEach((elem) => {
      elem.addEventListener('mousedown', (event) => new ButtonAnimation().addButtonClass(event as MouseEvent));
    });
    closeBurger.addEventListener('click', (event) => this.closeMenu(event));
    return wrapper;
  }

  private createItem(name: string, idPage:string, pathIcon: string):HTMLElement {
    const wrapper = createTag('a', CSSClass.navItem) as HTMLBaseElement;
    wrapper.href = `#${idPage}`;
    const svg = `<img src = ${pathIcon} alt = ${idPage}>`;
    const itemIcon = createTag('div', CSSClass.navItemIcon, svg);
    const itemName = createTag('div', CSSClass.navItemName, name);
    wrapper.append(itemIcon, itemName);
    return wrapper;
  }

  private closeMenu(event: Event):void {
    const closeBurger = event.currentTarget as HTMLElement;
    const header = document.querySelector(`.${CSSClass.header}`) as HTMLElement;
    const headerLogo = document.querySelector(`.${CSSClass.headerLogo}`) as HTMLElement;
    const Burger = document.querySelector(`.${CSSClass.headerBurger}`) as HTMLElement;
    const mainContainer = document.querySelector(`.${CSSClass.mainContainer}`) as HTMLElement;
    Burger.style.display = 'flex';
    closeBurger.style.display = 'none';
    headerLogo.style.margin = 'auto';
    header.classList.remove(CSSClass.headerShift);
    mainContainer.classList.remove(CSSClass.mainContainerShift);
  }
}
