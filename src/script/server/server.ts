import {
  ResponseUpdateToken, Statistics, UserAllWords, UserSettings, Word, WordSettings,
} from '../interface/server';
import { userInfo } from '../authorization/user';

export class Server {
  public port: string;

  private urlWords: string;

  private urlUsers: string;

  private urlStatistics: string;

  private urlSettings: string;

  private urlSignIn: string;

  private urlTokens: string;

  private urlAggregatedWords: string;

  public constructor() {
    this.port = 'https://learwords.herokuapp.com';
    this.urlWords = '/words';
    this.urlUsers = '/users';
    this.urlStatistics = '/statistics';
    this.urlSettings = '/settings';
    this.urlSignIn = '/signin';
    this.urlTokens = '/tokens';
    this.urlAggregatedWords = '/aggregatedWords';
  }

  private async checkResponse(response: Response): Promise<Response> {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }

  public async getAllWords(group = 0, page = 0): Promise<Word[]> {
    return fetch(`${this.port}${this.urlWords}?group=${group}&page=${page}`)
      .then((response) => response.json());
  }

  public async getWord(idWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlWords}/${idWord}`)
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

  public async getUserAllWords(): Promise<UserAllWords[]> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      });
  }

  public async getUserWord(idWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${idWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async createUserWord(idWord: string, wordSettings: WordSettings): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${idWord}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordSettings),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 417) {
        console.log('Слово уже было записано');
      }
      return Promise.reject(response);
    });
  }

  public async updateUserWord(idWord: string, wordSettings: WordSettings): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${idWord}`, {
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

  public async deleteUserWord(idWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlWords}/${idWord}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUserAggregatedWord(idWord: string, option:string): Promise<Response> {
    // eslint-disable-next-line max-len
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlAggregatedWords}/${idWord}?filter=${option}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => this.checkResponse(response));
  }

  public async getUserAggregatedAllWords(filter:string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userInfo.userId}${this.urlAggregatedWords}?filter=${filter}`, {
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

  public async updateUserToken(): Promise<ResponseUpdateToken> {
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
          return response.json();
        }
        return Promise.reject(response);
      });
  }

  public async signInUser(user: object): Promise<UserSettings> {
    return fetch(`${this.port}${this.urlSignIn}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
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
    });
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
