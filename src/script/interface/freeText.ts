export enum CSSClass {
  authorization = 'authorization',
  authorizationTitle = 'authorization__title',
  authorizationInput = 'authorization__input',
  authorizationInputEmail = 'authorization__input-email',
  authorizationInputPassword = 'authorization__input-password',
  authorizationButton = 'authorization__button',
  warning = 'warning',
  warningMessage = 'warning-message',
  gamesPage = 'games-page',
  gamesPageGame = 'games-page__game',
  gameAudio = 'game-audio',
  gamesPageGameName = 'games-page__game-name',
}

export enum AuthorizationText {
  mistakeUser = 'Пользователь с таким email не найден!',
  invalidEmail = 'Некорректный email!',
  incorrectPassword = 'Неверный пароль!',
  shortPassword = 'Пароль должен быть не менее 8 символов!',
  existsEmail = 'Такой email уже зарегистрирован',
}
