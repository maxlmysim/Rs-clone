import {
  Statistics, UserSettings, Word, WordSettings,
} from '../interface/server';

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
    this.urlTokens = '/tokens';
  }

  public async getAllWords(group = 0, page = 0): Promise<Word[]> {
    const result = await fetch(`${this.port}${this.urlWords}?group=${group}&page=${page}`);
    return result.json();
  }

  public async getWord(idWord: string): Promise<Word> {
    const result = await fetch(`${this.port}${this.urlWords}/${idWord}`);
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

  public async getUserAllWords(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async getUserWord(idWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}/${idWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async createUserWord(idWord: string, wordSettings: WordSettings): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}/${idWord}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
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

  public async updateUserWord(idWord: string, wordSettings: WordSettings): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}/${idWord}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordSettings),
    });
  }

  public async deleteUserWord(idWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}/${idWord}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async getUserAggregatedWord(idWord: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}/${idWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async getUserAggregatedAllWords(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlWords}`, {
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

  public async updateUserToken(): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userSettings?.userId}${this.urlTokens}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userSettings?.refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.saveUserInLocalStorage(response);
          return response;
        }
        return Promise.reject(response);
      });
  }

  private async saveUserInLocalStorage(userResponse: Response): Promise<void> {
    const user = await userResponse.json();
    userSettings = user;
    localStorage.setItem('user', JSON.stringify(user));
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
