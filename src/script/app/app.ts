import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';
import { AuthorizationView } from '../authorization/authorizationView';
import { IdPages } from '../interface/typeApp';
import { MainPage } from '../view/pages/mainPage/mainPage';
import { Server } from '../server/server';
import textbookRender, { rootTextbook } from '../view/pages/textbook/Textbook';
import dictionaryRender, { rootDictionary } from '../view/pages/textbook/Dictionary';
import { GamesPage } from '../view/pages/games/gamesPage';
import { AboutProject } from '../view/pages/mainPage/aboutProject';
import { singInUserAndUpdateToken } from '../authorization/user';
import { ViewAudioGame } from '../view/components/audioGame/viewAudioGame';
import { resetKeyDownListener } from '../helper/helper';
import { AboutTeam } from '../view/pages/aboutTeam/aboutTeam';
import { StatisticsView } from '../view/pages/statistics/statisticsView';
import { ViewSprintGame } from '../view/components/sprintGame/viewSprintGame';

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
    await this.server.updateUserToken()
      .then((data) => singInUserAndUpdateToken(data))
      .catch(() => {});
    this.controller.startPage(this.view.renderPage);
    this.startPageUseHash();
  }

  private startPageUseHash():void {
    resetKeyDownListener();

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
      case IdPages.ebook: {
        this.controller.openPage(rootTextbook, textbookRender);
        break;
      }
      case IdPages.dictionary: {
        this.controller.openPage(rootDictionary, dictionaryRender);
        break;
      }
      case IdPages.games: {
        const gamesPage = new GamesPage();
        this.controller.openPage(gamesPage.init());
        break;
      }
      case IdPages.gameAudio: {
        const game = new ViewAudioGame();
        this.controller.openPage(game.init());
        break;
      }
      case IdPages.gameSprint: {
        const game = new ViewSprintGame();
        this.controller.openPage(game.init());
        break;
      }
      case IdPages.aboutProject: {
        const aboutProject = new AboutProject();
        this.controller.openPage(aboutProject.init());
        break;
      }
      case IdPages.aboutTeam: {
        const aboutTeam = new AboutTeam();
        this.controller.openPage(aboutTeam.init());
        break;
      }
      case IdPages.statistics: {
        const statistics = new StatisticsView();
        this.controller.openPage(statistics.init());
        break;
      }
      default: {
        this.controller.openPage(this.mainPage.create());
      }
    }
  }
}
