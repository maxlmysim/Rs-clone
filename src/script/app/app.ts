import { ViewAuthorization } from '../authorization/viewAuthorization';

export class App {
  private viewAuthorization: ViewAuthorization;

  public constructor() {
    this.viewAuthorization = new ViewAuthorization();
  }

  public async start(): Promise<void> {
    this.viewAuthorization.init();
  }
}
