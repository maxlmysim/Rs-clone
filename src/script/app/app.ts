import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';

export class App {
  private view: ViewApp;

  private controller: ControllerApp;

  public constructor() {
    this.controller = new ControllerApp();
    this.view = new ViewApp();
  }

  public async start(): Promise<void> {
    this.view.renderPage();
  }
}
