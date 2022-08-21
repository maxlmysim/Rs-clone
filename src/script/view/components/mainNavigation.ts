import { createTag } from '../../helper/helper';
import { IdPages, NamePages } from '../../interface/typeApp';

export class Navigation {
  public creat():HTMLElement {
    const wrapper = createTag('div', 'nav-items', '');
    const main = this.createItem(NamePages.main, IdPages.main, `./assets/svg/${IdPages.main}.svg`);
    const ebook = this.createItem(NamePages.ebook, IdPages.ebook, `./assets/svg/${IdPages.ebook}.svg`);
    const dictionary = this.createItem(NamePages.dictionary, IdPages.dictionary, `./assets/svg/${IdPages.dictionary}.svg`);
    const games = this.createItem(NamePages.games, IdPages.games, `./assets/svg/${IdPages.games}.svg`);
    const statistics = this.createItem(NamePages.statistics, IdPages.statistics, `./assets/svg/${IdPages.statistics}.svg`);
    const about = this.createItem(NamePages.aboutTeam, IdPages.aboutTeam, `./assets/svg/${IdPages.about}.svg`);
    const review = this.createItem(NamePages.review, IdPages.review, `./assets/svg/${IdPages.review}.svg`);
    wrapper.append(main, ebook, dictionary, games, statistics, about, review);
    return wrapper;
  }

  private createItem(name: string, idPage:string, pathIcon: string):HTMLElement {
    const wrapper = createTag('a', 'nav-item', '') as HTMLBaseElement;
    wrapper.href = `#${idPage}`;
    const svg = `<img src = ${pathIcon} alt = ${idPage}>`;
    const itemIcon = createTag('div', 'item__icon', `${svg}`);
    const itemName = createTag('div', 'item__name', `${name}`);
    wrapper.append(itemIcon, itemName);
    return wrapper;
  }
}
