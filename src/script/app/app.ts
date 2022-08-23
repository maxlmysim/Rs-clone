import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';
import { AuthorizationView } from '../authorization/authorizationView';
import { IdPages } from '../interface/typeApp';
import { MainPage } from '../view/pages/mainPage';
import { Server } from '../server/server';
import { userInfo } from '../authorization/user';

export class App {
  private view: ViewApp;

  private controller: ControllerApp;

  private mainPage : MainPage;

  private server: Server;

  public constructor() {
    this.view = new ViewApp();
    this.controller = new ControllerApp();
    this.mainPage = new MainPage();
    this.server = new Server();
  }

  public async start():Promise<void> {
    await window.addEventListener('load', this.startApp.bind(this));
    await window.addEventListener('hashchange', this.startPageUseHash.bind(this));
  }

  private async startApp(): Promise<void> {
    await this.server.getUser().then(() => {
      userInfo.login = true;
    }).catch(() => {});

    this.controller.startPage(this.view.renderPage);
    this.startPageUseHash();
  }

  private startPageUseHash():void {
    const newHash = window.location.hash.slice(1);
    switch (newHash) {
      case IdPages.login: {
        const auth = new AuthorizationView();
        this.controller.openPage(auth.init());
        break;
      }
      case IdPages.main: {
        this.controller.openPage(this.mainPage.create());
        break;
      }
      default: {
        this.controller.openPage(this.mainPage.create());
      }
    }
  }
}
