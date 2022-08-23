import {
  Statistics, WordSettings,
} from '../interface/server';
import { userInfo } from '../authorization/user';

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
    this.urlTokens = '/tokens';
  }

  private async checkResponse(response: Response): Promise<Response> {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }

  public async getAllWords(group = 0, page = 0): Promise<Response> {
    return fetch(`${this.port}${this.urlWords}?group=${group}&page=${page}`)
      .then((response) => this.checkResponse(response));
  }

  public async getWord(userIdWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlWords}/${userIdWord}`)
      .then((response) => this.checkResponse(response));
  }

  public async createNewUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUser(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUserAllWords(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUserWord(userIdWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${userIdWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async createUserWord(userIdWord: string, wordSettings: WordSettings): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${userIdWord}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordSettings),
    }).then((response) => {
      if (response.ok) {
        return response;
      }
      if (response.status === 417) {
        console.log('Слово уже было записано');
      }
      return Promise.reject(response);
    });
  }

  public async updateUserWord(userIdWord: string, wordSettings: WordSettings): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${userIdWord}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordSettings),
    })
      .then((response) => this.checkResponse(response));
  }

  public async deleteUserWord(userIdWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${userIdWord}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUserAggregatedWord(userIdWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${userIdWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUserAggregatedAllWords(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async updateUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => this.checkResponse(response));
  }

  public async deleteUser(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async updateUserToken(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlTokens}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(response);
      });
  }

  private async saveUserInLocalStorage(userResponse: Response): Promise<void> {
    const user = await userResponse.json();
    Object.assign(userInfo, user);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public async signInUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlSignIn}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          this.saveUserInLocalStorage(response);
          return response;
        }
        return Promise.reject(response);
      });
  }

  public async getStatistics(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlStatistics}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async updateStatistics(statistics: Statistics): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlStatistics}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
    })
      .then((response) => this.checkResponse(response));
  }
}
