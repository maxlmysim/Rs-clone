import { createTag } from '../../../helper/helper';
import { IdPages, NamePages } from '../../../interface/typeApp';
import { CSSClass, AboutPtojectText } from '../../../interface/freeText';

export class AboutProject {
  public init():HTMLElement {
    const wrapper = createTag('div', IdPages.aboutProject);
    const title = createTag('h2', CSSClass.aboutProjectTitle, AboutPtojectText.title);
    const projectText = createTag('p', CSSClass.aboutProjectText, AboutPtojectText.text);
    const advanced = this.advanced();
    wrapper.append(title, projectText, advanced);
    return wrapper;
  }

  private advanced():HTMLElement {
    const wrapper = createTag('div', CSSClass.aboutProjectAdvancedItems);
    const svgEbook = `<img src = './assets/svg/${IdPages.ebook}.svg' alt = ${IdPages.ebook}>`;
    const svgDictionary = `<img src = './assets/svg/${IdPages.dictionary}.svg' alt = ${IdPages.dictionary}>`;
    const itemEbook = this.createItem(svgEbook, NamePages.ebook, AboutPtojectText.ebookText);
    const itemDictionary = this.createItem(svgDictionary, NamePages.dictionary, AboutPtojectText.dictionaryText);
    wrapper.append(itemEbook, itemDictionary);
    return wrapper;
  }

  private createItem(svg: string, name: string, text: string):HTMLElement {
    const wrapper = createTag('div', CSSClass.aboutProjectAdvancedItem);
    const itemSVG = createTag('div', CSSClass.aboutProjectAdvancedSvg, svg);
    const itemName = createTag('div', CSSClass.aboutProjectAdvancedName, name);
    const itemText = createTag('div', CSSClass.aboutProjectAdvancedText, text);
    wrapper.append(itemSVG, itemName, itemText);
    return wrapper;
  }
}
