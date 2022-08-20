import { createTag } from '../helper/helper';

export class ViewApp {
  public renderPage():void {
    const wrapper = createTag('div', 'wrapper', 'Hello world');
    document.body.append(wrapper);
  }

  public renderHeader():void {
    const header = createTag('header', 'header', '');
  }
}
