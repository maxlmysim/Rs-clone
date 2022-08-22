import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';
import { AuthorizationView } from '../authorization/authorizationView';
import { IdPages } from '../interface/typeApp';

export class App {
  private view: ViewApp;

  private controller: ControllerApp;

  public constructor() {
    this.controller = new ControllerApp();
    this.view = new ViewApp();
  }

  // public async start(view = this.view.renderPage): Promise<void> {
  //   this.controller.startPage(vie
  // }

  public start():void {
    const { hash } = window.location;
    if (!hash) {
      this.controller.startPage(this.view.renderPage);
    }

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.slice(1);
      switch (newHash) {
        case IdPages.login: {
          const auth = new AuthorizationView();
          this.controller.openPage(auth.init());
          break;
        }
        default: {
          this.controller.startPage(this.view.renderPage);
        }
      }
    });
  }
}
