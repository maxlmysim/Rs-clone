import { createTag } from './helper';

export class ButtonAnimation {
  public addButtonClass(event: MouseEvent):void {
    const btn = event.currentTarget as HTMLButtonElement;
    const curBtn = event.target as HTMLElement;
    let x = event.offsetX;
    const y = event.offsetY;
    if (curBtn.classList.contains('item__name')) {
      x = event.offsetX + curBtn.offsetLeft;
    }
    const circle = createTag('div', ['circle', 'grow']) as HTMLElement;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    btn.append(circle);
  }
}
