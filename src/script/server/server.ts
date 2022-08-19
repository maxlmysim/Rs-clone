import { Statistics, Word } from '../interface/server';

export class Server {
  public port: string;

  public urlWords: string;

  public urlUsers: string;

  public urlStatistics: string;

  public urlSettings: string;

  public urlSignIn: string;

  public urlTokens: string;

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

  public async getWord(userId: string): Promise<Word> {
    const result = await fetch(`${this.port}${this.urlWords}/${userId}`);
    return result.json();
  }

  public async createNewUser(user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  }

  public async getUser(userId: string, token: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateUser(userId: string, token: string, user: object): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  public async deleteUser(userId: string, token: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async getUserToken(userId: string, token: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userId}${this.urlTokens}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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

  public async getStatistics(userId: string, token: string): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userId}${this.urlStatistics}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateStatistics(userId: string, token: string, statistics: Statistics): Promise<Response> {
    return fetch(`${this.port}${this.urlUsers}/${userId}${this.urlStatistics}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
    });
  }
}
