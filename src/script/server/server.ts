import {
  Statistics, Token, User, Word,
} from '../interface/server';

export class Server {
  public port: string;

  public urlWords: string;

  public urlUsers: string;

  public urlStatistics: string;

  public urlSettings: string;

  public urlSingIn: string;

  public urlTokens: string;

  protected constructor() {
    this.port = 'https://learwords.herokuapp.com';
    this.urlWords = '/words';
    this.urlUsers = '/users';
    this.urlStatistics = '/statistics';
    this.urlSettings = '/settings';
    this.urlSingIn = '/singin';
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

  public async createNewUser(user: object): Promise<void> {
    const result = await fetch(`${this.port}${this.urlUsers}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return result.json();
  }

  public async getUser(userId: string): Promise<User> {
    const result = await fetch(`${this.port}${this.urlUsers}/${userId}`);
    return result.json();
  }

  public async updateUser(userId: string, user: object): Promise<void> {
    const result = await fetch(`${this.port}${this.urlUsers}/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return result.json();
  }

  public async deleteUser(userId: string): Promise<void> {
    const result = await fetch(`${this.port}${this.urlUsers}/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return result.json();
  }

  public async getUserToken(userId: string): Promise<Token> {
    const result = await fetch(`${this.port}${this.urlUsers}/${userId}${this.urlTokens}`);
    return result.json();
  }

  public async singInUser(user: object): Promise<Token> {
    const result = await fetch(`${this.port}${this.urlSingIn}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return result.json();
  }

  public async getStatistics(userId: string): Promise<Statistics> {
    const result = await fetch(`${this.port}${this.urlUsers}/${userId}${this.urlStatistics}`);
    return result.json();
  }

  public async updateStatistics(userId: string, statistics: Statistics): Promise<Statistics> {
    const result = await fetch(`${this.port}${this.urlUsers}/${userId}${this.urlStatistics}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statistics),
    });
    return result.json();
  }
}
