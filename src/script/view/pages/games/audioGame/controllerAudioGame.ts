import { ControllerApp } from '../../../../controller/controller';
import { shuffleWordList } from '../../../../helper/helper';
import { Server } from '../../../../server/server';
import { modelAudioGame } from './modelAudioGame';
import { ViewAudioGame } from './viewAudioGame';

export class ControllerAudioGame {
  private controllerApp: ControllerApp;

  private server: Server;

  private view: ViewAudioGame;

  public constructor(view: ViewAudioGame) {
    this.controllerApp = new ControllerApp();
    this.server = new Server();
    this.view = view;
  }

  public async loadWordsAndStartGame(): Promise<void> {
    const listWord = await this.server.getAllWords(modelAudioGame.difficulty);
    shuffleWordList(listWord);

    modelAudioGame.quantityWords = listWord.length;
    Object.assign(modelAudioGame.currentWord, listWord[0]);
    modelAudioGame.listWords.push(...listWord);

    this.controllerApp.openPage(this.view.createPageWithWord(modelAudioGame.currentWord));
  }

  public changeDifficulty(difficulty: number): void {
    modelAudioGame.difficulty = difficulty;
  }

  public async playVoice(): Promise<void> {
    const audio = await new Audio(`${this.server.port}/${modelAudioGame.currentWord.audio}`);
    audio.play();
  }
}
