export enum CSSClass {
  authorization = 'authorization',
  authorizationTitle = 'authorization__title',
  authorizationInput = 'authorization__input',
  authorizationInputEmail = 'authorization__input-email',
  authorizationInputPassword = 'authorization__input-password',
  authorizationButton = 'authorization__button',
  authorizationSignInButton = 'authorization__sign-in-button',
  authorizationRegisterButton = 'authorization__register-button',
  warning = 'warning',
  warningMessage = 'warning-message',
}

export enum AuthorizationText {
  mistakeUser = 'Пользователь с таким email не найден!',
  invalidEmail = 'Некорректный email!',
  incorrectPassword = 'Неверный пароль!',
  shortPassword = 'Пароль должен быть не менее 8 символов!',
  existsEmail = 'Такой email уже зарегистрирован',
}
