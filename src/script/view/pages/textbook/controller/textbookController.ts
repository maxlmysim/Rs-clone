// import { MenuItemTypeMap } from '@mui/material';
import { Word } from '../../../../interface/server';
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
    console.log(this.group, this.page);
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
}
