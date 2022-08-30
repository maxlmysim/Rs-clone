// import { MenuItemTypeMap } from '@mui/material';
import { Word, WordSettings } from '../../../../interface/server';
import { Server } from '../../../../server/server';

export class TextbookController {
  private server: Server;

  public groupsNum = 6;

  public pagesNum = 30;

  public group: number;

  public page: number;

  public port: string;

  public constructor() {
    this.server = new Server();
    this.group = 0;
    this.page = 0;
    this.port = this.server.port;
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

  public setHardWord(word: Word): void {
    const wordSet: WordSettings = {
      difficulty: 'hard',
    };
    this.server.createUserWord(word.id, wordSet);
    console.log('Сложное слово добавлено');
  }
}
