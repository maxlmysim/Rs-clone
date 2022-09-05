import { createInput, createTag } from '../helper/helper';
import { CSSClass } from '../interface/freeText';
import { AuthorizationController } from './authorizationController';

export class AuthorizationView {
  private controller: AuthorizationController;

  public constructor() {
    this.controller = new AuthorizationController();
  }

  public init(elem: HTMLElement = this.signInView()): HTMLElement {
    const authWrapper = document.querySelector(`.${CSSClass.authorization}`);

    if (authWrapper) {
      authWrapper.innerHTML = '';
      authWrapper.append(elem);
      return elem;
    }

    return elem;
  }

  public signInView(): HTMLElement {
    const wrapper = createTag('div', CSSClass.authorization);
    const title = createTag('h2', CSSClass.authorizationTitle, 'вход в аккаунт');
    const inputEmail = createInput(
      'email',
      [CSSClass.authorizationInputEmail,
        CSSClass.authorizationInput],
      '',
      'Email*',
    );
    const inputPassword = createInput(
      'password',
      [CSSClass.authorizationInputPassword,
        CSSClass.authorizationInput],
      '',
      'Пароль*',
    );
    const signInButton = createTag('button', CSSClass.authorizationButton, 'войти');
    signInButton.onclick = (): void => {
      this.deleteAllWarningMessage();
      this.controller.singInUser(inputEmail, inputPassword);
    };
    const registerButton = createTag('button', CSSClass.authorizationButton, 'регистрация');
    registerButton.onclick = (): HTMLElement => this.init(this.registerView());

    wrapper.append(title, inputEmail, inputPassword, signInButton, registerButton);
    return wrapper;
  }

  private registerView(): HTMLElement {
    const wrapper = createTag('div', CSSClass.authorization);
    const title = createTag('h2', CSSClass.authorizationTitle, 'регистрация');
    const inputName = createInput('text', CSSClass.authorizationInput, '', 'Ваше имя*');
    const inputEmail = createInput(
      'email',
      [CSSClass.authorizationInputEmail, CSSClass.authorizationInput],
      '',
      'email*',
    );
    const inputPassword = createInput(
      'password',
      [CSSClass.authorizationInputPassword, CSSClass.authorizationInput],
      '',
      'password*',
    );
    const registerButton = createTag('button', CSSClass.authorizationButton, 'зарегистрироваться');
    registerButton.onclick = (): void => {
      this.deleteAllWarningMessage();
      this.controller.createNewUser(inputName, inputEmail, inputPassword);
    };
    const signInButton = createTag('button', CSSClass.authorizationButton, 'у меня уже есть аккаунт');
    signInButton.onclick = (): HTMLElement => this.init(this.signInView());
    wrapper.append(title, inputName, inputEmail, inputPassword, registerButton, signInButton);
    return wrapper;
  }

  private deleteAllWarningMessage(): void {
    const messages = document.querySelectorAll(`.${CSSClass.warningMessage}`);
    messages.forEach((item) => item.remove());
    const alertBorderClass = document.querySelectorAll(`.${CSSClass.warning}`);
    alertBorderClass.forEach((item) => item.classList.remove(CSSClass.warning));
  }
}
