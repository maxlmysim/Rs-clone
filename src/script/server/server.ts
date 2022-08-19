import { Statistics, UserSettings, Word } from '../interface/server';

let userSettings: UserSettings;

const userFromLocalStorage = localStorage.getItem('user');
if (userFromLocalStorage) {
  userSettings = JSON.parse(userFromLocalStorage);
}

export class Server {
  private port: string;

  private urlWords: string;

  private urlUsers: string;

  private urlStatistics: string;

  private urlSettings: string;

  private urlSignIn: string;

  private urlTokens: string;

  public constructor() {
    this.port = 'https://learwords.herokuapp.com';
    this.urlWords = '/words';
    this.urlUsers = '/users';
    this.urlStatistics = '/statistics';
    this.urlSettings = '/settings';
    this.urlSignIn = '/signin';
    this.urlTokens = '/token';
  }

  public async getAllWords(group = 0, page = 0): Promise<Word[]> {
    const result = await fetch(`${this.port}${this.urlWords}?group=${group}&page=${page}`);
    return result.json();
  }

  public async getWord(): Promise<Word> {
    const result = await fetch(`${this.port}${this.urlWords}/${userSettings?.userId}`);
    return result.json();
  }

  public async createNewUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  }

  public async getUser(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  public async deleteUser(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async getUserToken(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlTokens}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async signInUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlSignIn}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  }

  public async getStatistics(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlStatistics}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateStatistics(statistics: Statistics): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlStatistics}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
    });
  }
}
