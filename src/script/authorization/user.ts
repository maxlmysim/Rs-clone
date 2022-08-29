import { UserSettings } from '../interface/server';
import { CSSClass } from '../interface/freeText';

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
  // userInfo.login = true;
  // console.log('sdasdas', userInfo);
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
  const autorizationSVG = document.querySelectorAll(`.${CSSClass.headerSVG}`) as NodeList;
  (autorizationSVG[1] as HTMLElement).innerHTML = '<img src = "./assets/svg/Login.svg" alt = "login">';
}
