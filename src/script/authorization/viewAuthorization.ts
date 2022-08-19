import { createInput, createTag } from '../helper/helper';
import { ControllerAuthorization } from './controllerAuthorization';
import { CSSClass } from '../config/freeText';

export class ViewAuthorization {
  private mainContent: HTMLElement;

  private controller: ControllerAuthorization;

  public constructor() {
    this.mainContent = document.querySelector('body') as HTMLElement;
    this.controller = new ControllerAuthorization();
  }

  public init(): void {
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
      this.controller.singInUser(inputEmail, inputPassword);
    };
    const registerButton = createTag('button', CSSClass.authorizationButton, 'регистрация');

    wrapper.append(title, inputEmail, inputPassword, signInButton, registerButton);
    this.mainContent.innerHTML = '';
    this.mainContent.append(wrapper);
  }

  private registerView(): void {
    const wrapper = createTag('div', CSSClass.authorization);
    const title = createTag('h2', CSSClass.authorizationTitle, 'регистрация');
    const inputEmail = createInput('email', [CSSClass.authorizationInputEmail, CSSClass.authorizationInput], 'email');
    const inputPassword = createInput(
      'password',
      [CSSClass.authorizationInputPassword,
        CSSClass.authorizationInput],
      'password',
    );
    const registerButton = createTag('button', CSSClass.authorizationButton, 'зарегистрироваться');
    const signInButton = createTag('button', CSSClass.authorizationButton, 'у меня уже есть аккаунт');

    wrapper.append(title, inputEmail, inputPassword, registerButton, signInButton);
    this.mainContent.innerHTML = '';
    this.mainContent.append(wrapper);
  }
}
