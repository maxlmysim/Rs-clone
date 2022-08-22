import { CallBack } from '../interface/typeApp';

export class ControllerApp {
  public startPage(callback: CallBack):void {
    callback();
  }

  public openPage(view: HTMLElement, render?: CallBack):void {
    const mainContent = document.querySelector('.main-container') as HTMLElement;
    mainContent.innerHTML = '';
    mainContent.append(view);
    if (render) render();
  }
}
