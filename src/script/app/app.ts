import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';
import { AuthorizationView } from '../authorization/authorizationView';

export class App {
  private view: ViewApp;

  private controller: ControllerApp;

  public constructor() {
    this.controller = new ControllerApp();
    this.view = new ViewApp();
    this.changePageByHash();
  }

  public async start(view = this.view.renderPage): Promise<void> {
    this.controller.startPage(view);
  }

  private changePageByHash():void {
    window.location.hash = '#';
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'login') {
        const auth = new AuthorizationView();
        this.controller.openPage(auth.init());
      } else if (hash === 'main-page') {
        // this.controller.openPage();
      }
    });
  }
}
