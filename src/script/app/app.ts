import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';
import { AuthorizationView } from '../authorization/authorizationView';
import { IdPages } from '../interface/typeApp';
import textbookRender, { rootTextbook } from '../view/pages/textbook';

export class App {
  private view: ViewApp;

  private controller: ControllerApp;

  public constructor() {
    this.view = new ViewApp();
    this.controller = new ControllerApp();
  }

  public async start():Promise<void> {
    this.startPageUseHash();

    window.addEventListener('hashchange', this.startPageUseHash.bind(this));
  }

  private startPageUseHash():void {
    const newHash = window.location.hash.slice(1);
    switch (newHash) {
      case IdPages.login: {
        console.log(this);
        const auth = new AuthorizationView();
        this.controller.openPage(auth.init());
        break;
      }
      case IdPages.main: {
        break;
      }
      case IdPages.ebook: {
        this.controller.openPage(rootTextbook, textbookRender);
        break;
      }
      default: {
        console.log(this);
        this.controller.startPage(this.view.renderPage);
      }
    }
  }
}
