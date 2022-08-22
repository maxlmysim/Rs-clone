import { ViewApp } from '../view/viewApp';
import { ControllerApp } from '../controller/controller';
import textbookRender from './textbook';

export class App {
  private view: ViewApp;

  private controller: ControllerApp;

  public constructor() {
    this.controller = new ControllerApp();
    this.view = new ViewApp();
  }

  public async start(): Promise<void> {
    this.controller.startPage(() => this.view.renderPage());
    textbookRender();
    // there will be start app
    // Test React
    // main page .init()
  }
}
