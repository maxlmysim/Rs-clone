import { ResponseUpdateToken, UserSettings } from '../interface/server';
import { CSSClass } from '../interface/freeText';
import { createImg } from '../helper/helper';

export const userInfo: UserSettings = {
  login: false,
  token: '',
  refreshToken: '',
  name: '',
  userId: '',
};

const userFromLocalStorage = localStorage.getItem('userInfo');
if (userFromLocalStorage) {
  const userSettings = JSON.parse(userFromLocalStorage);
  Object.assign(userInfo, userSettings);
}

function saveUserInLocalStorage(userSettings:UserSettings): void {
  localStorage.setItem('userInfo', JSON.stringify(userSettings));
}

function changeLogoAuthorization():void {
  const logo = document.querySelector(`.${CSSClass.authorizationLogo}`);

  if (logo) {
    if (userInfo.login) {
      const img = createImg('./assets/svg/logout.svg', CSSClass.authorizationSVG, 'logOut');
      logo.innerHTML = '';
      logo.append(img);
    } else {
      const img = createImg('./assets/svg/Login.svg', CSSClass.authorizationSVG, 'logIn');
      logo.innerHTML = '';
      logo.append(img);
    }
  }
}

export function logoutUser(): void {
  Object.assign(userInfo, {
    login: false,
    token: '',
    refreshToken: '',
    name: '',
    userId: '',
  });
  localStorage.removeItem('userInfo');

  changeLogoAuthorization();
}

export function singInUser(userSettings:UserSettings): void {
  userInfo.login = true;
  Object.assign(userInfo, userSettings);
  saveUserInLocalStorage(userSettings);
  changeLogoAuthorization();
}

export function singInUserAndUpdateToken(newTokens: ResponseUpdateToken): void {
  const userLocalStorage = localStorage.getItem('userInfo');
  let user;
  if (userLocalStorage) {
    user = JSON.parse(userLocalStorage);
  }
  Object.assign(user, newTokens);
  singInUser(user);
}
