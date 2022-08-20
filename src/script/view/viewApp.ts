import { createTag } from '../helper/helper';
import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';

export class ViewApp {
  public renderPage():void {
    const wrapper = createTag('div', 'wrapper', '');
    wrapper.append(new Header().create(), new Main().create(), new Footer().create());
    document.body.append(wrapper);
  }
}
