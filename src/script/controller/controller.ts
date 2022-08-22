import { CallBack } from '../interface/typeApp';

export class ControllerApp {
  public startPage(callback: CallBack):void {
    callback();
  }
//   private changePageByHash():void {
//     window.addEventListener('hashchange', () => {
//       const hash = window.location.hash.slice(1);
//     })
//   }
}
