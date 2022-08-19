import { AuthorizationView } from '../authorization/authorizationView';

export class App {
  private AuthorizationView: AuthorizationView;

  public constructor() {
    this.AuthorizationView = new AuthorizationView();
  }

  public async start(): Promise<void> {
    this.AuthorizationView.init();
  }
}
