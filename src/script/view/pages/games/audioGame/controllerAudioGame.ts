import { ControllerApp } from '../../../../controller/controller';
import { shuffleWordList } from '../../../../helper/helper';
import { Server } from '../../../../server/server';
import { modelAudioGame } from './modelAudioGame';
import { ViewAudioGame } from './viewAudioGame';
import { ModelAudioGame } from '../../../../interface/audioGame';
import successSound from '../../../../../assets/sounds/correct.mp3';
import failSound from '../../../../../assets/sounds/wrong.mp3';

export class ControllerAudioGame {
  private controllerApp: ControllerApp;

  private server: Server;

  private view: ViewAudioGame;

  private model: ModelAudioGame;

  public constructor(view: ViewAudioGame) {
    this.controllerApp = new ControllerApp();
    this.server = new Server();
    this.view = view;
    this.model = modelAudioGame;
  }

  public async loadWordsAndStartGame(): Promise<void> {
    const listWord = await this.server.getAllWords(this.model.difficulty - 1);
    shuffleWordList(listWord);
    console.log(listWord[0]);
    this.model.quantityWords = listWord.length;
    this.model.listWords.length = 0;
    this.model.listWords.push(...listWord);

    this.controllerApp.openPage(
      this.view.createPageWithWord(),
    );
  }

  public changeDifficulty(difficulty: number): void {
    this.model.difficulty = difficulty;
  }

  public getVoice(): HTMLAudioElement {
    return new Audio(`${this.server.port}/${this.model.listWords[this.model.currentNumWord].audio}`);
  }

  public wrongAnswer(): void {
    const audio = new Audio(failSound);
    audio.play();
    console.log('wrongAnswer');
  }

  public rightAnswer(): void {
    const audio = new Audio(successSound);
    audio.play();
    console.log('rightAnswer');
  }
}
