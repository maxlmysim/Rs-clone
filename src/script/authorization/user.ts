import { UserSettings } from '../interface/server';

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

export function logoutUser(): void {
  Object.assign(userInfo, {
    login: false,
    token: '',
    refreshToken: '',
    name: '',
    userId: '',
  });
  localStorage.removeItem('userInfo');
}
