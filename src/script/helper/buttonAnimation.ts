import { createTag } from './helper';

export class ButtonAnimation {
  public addButtonClass(event: MouseEvent):void {
    const btn = event.currentTarget as HTMLButtonElement;
    btn.classList.add('hold-mouse');
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x, y);
    const circle = createTag('div', ['circle', 'grow']) as HTMLElement;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    btn.append(circle);
  }

  public removeButtonClass(event: MouseEvent):void {
    const btn = event.currentTarget as HTMLButtonElement;
    btn.classList.remove('hold-mouse');
  }
}
