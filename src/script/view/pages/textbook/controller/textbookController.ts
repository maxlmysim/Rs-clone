import { Word, WordSettings } from '../../../../interface/server';
import { IUserWordsResponse } from '../../../../interface/textbook';
import { Server } from '../../../../server/server';

export class TextbookController {
  private server: Server;

  public groupsNum = 6;

  public pagesNum = 30;

  public group: number;

  public page: number;

  public port: string;

  public userWords: Promise<IUserWordsResponse[]>;

  public constructor() {
    this.server = new Server();
    this.group = 0;
    this.page = 0;
    this.port = this.server.port;
    this.userWords = this.server.getUserAllWords();
  }

  public playSounds(word: Word): void {
    const sounds = [
      new Audio(`${this.server.port}/${word.audio}`),
      new Audio(`${this.server.port}/${word.audioMeaning}`),
      new Audio(`${this.server.port}/${word.audioExample}`),
    ];
    let i = -1;
    function playSnd(): void {
      i += 1;
      if (i === sounds.length) return;
      sounds[i].addEventListener('ended', playSnd);
      sounds[i].play();
    }
    playSnd();
  }

  public refreshHardWords(): void {
    this.userWords = (this.server.getUserAllWords()) as Promise<IUserWordsResponse[]>;
  }

  public setHardWord(word: Word): void {
    const wordSet: WordSettings = {
      difficulty: 'hard',
    };
    this.server.createUserWord(word.id, wordSet);
    this.refreshHardWords();
  }

  public removeHardWord(word: Word): void {
    this.server.deleteUserWord(word.id);
    this.refreshHardWords();
  }
}
