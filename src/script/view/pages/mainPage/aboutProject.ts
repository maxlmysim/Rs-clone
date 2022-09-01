import { createTag } from '../../../helper/helper';
import { IdPages, NamePages } from '../../../interface/typeApp';
import { CSSClass, AboutPtojectText } from '../../../interface/freeText';

export class AboutProject {
  public init():HTMLElement {
    const wrapper = createTag('div', IdPages.aboutProject);
    const title = createTag('h2', CSSClass.aboutProjectTitle, AboutPtojectText.title);
    const projectText = createTag('p', CSSClass.aboutProjectText, AboutPtojectText.text);
    const items = createTag('div', CSSClass.aboutProjectAdvancedItems);
    items.append(...this.advanced());
    const wrapperBtn = createTag('div', CSSClass.aboutProjectBtnWrapper);
    const aboutTeamBtn = createTag('a', CSSClass.aboutProjectBtn, NamePages.aboutTeam) as HTMLAnchorElement;
    aboutTeamBtn.href = `#${IdPages.aboutTeam}`;
    const youtubeBtn = createTag('div', CSSClass.aboutProjectBtn, NamePages.aboutProjectYoutube);
    wrapperBtn.append(aboutTeamBtn, youtubeBtn);
    youtubeBtn.onclick = (event):void => this.addAboutProjectYoutubeBtn(event);
    wrapper.append(title, projectText, items, wrapperBtn);
    return wrapper;
  }

  private advanced():Array<HTMLElement> {
    const svgEbook = `<img src = './assets/svg/${IdPages.ebook}.svg' alt = ${IdPages.ebook}>`;
    const svgDictionary = `<img src = './assets/svg/${IdPages.dictionary}.svg' alt = ${IdPages.dictionary}>`;
    const svgGame = `<img src = './assets/svg/${IdPages.games}.svg' alt = ${IdPages.games}>`;
    const svgStatistics = `<img src = './assets/svg/${IdPages.statistics}.svg' alt = ${IdPages.statistics}>`;
    const itemEbook = this.createItem(svgEbook, NamePages.ebook, AboutPtojectText.ebookText);
    const itemDictionary = this.createItem(svgDictionary, NamePages.dictionary, AboutPtojectText.dictionaryText);
    const itemGame = this.createItem(svgGame, NamePages.games, AboutPtojectText.gameText);
    const itemStatistics = this.createItem(svgStatistics, NamePages.statistics, AboutPtojectText.statisticsText);
    const items = [itemEbook, itemDictionary, itemGame, itemStatistics];
    return items;
  }

  private createItem(svg: string, name: string, text: string):HTMLElement {
    const wrapper = createTag('div', CSSClass.aboutProjectAdvancedItem);
    const itemSVG = createTag('div', CSSClass.aboutProjectAdvancedSvg, svg);
    const itemName = createTag('div', CSSClass.aboutProjectAdvancedName, name);
    const itemText = createTag('div', CSSClass.aboutProjectAdvancedText, text);
    wrapper.append(itemSVG, itemName, itemText);
    return wrapper;
  }

  private addAboutProjectYoutubeBtn(event: Event):void {
    const wrapper = document.querySelector(`.${CSSClass.aboutProjectAdvancedItems}`) as HTMLElement;
    const btn = event.currentTarget as HTMLElement;
    wrapper.classList.toggle(CSSClass.aboutProjectBtnYoutube);
    if (wrapper.classList.contains(CSSClass.aboutProjectBtnYoutube)) {
      btn.innerHTML = `${AboutPtojectText.aboutProjectBtn}`;
      wrapper.innerHTML = AboutPtojectText.youtubeFrame;
    } else {
      wrapper.innerHTML = '';
      btn.innerHTML = `${AboutPtojectText.aboutProjectYoutube}`;
      wrapper.append(...this.advanced());
    }
  }
}
