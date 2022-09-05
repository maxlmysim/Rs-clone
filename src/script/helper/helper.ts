import { Word } from '../interface/server';

type CreateTag = (tag: string, className: string | string[], value?: string) => HTMLElement;
export const createTag: CreateTag = (tag: string, className: string | string[], value?: string) => {
  const elem = document.createElement(tag);

  if (value) {
    elem.innerHTML = value;
  }

  if (className) {
    if (Array.isArray(className)) {
      elem.classList.add(...className);
    } else {
      elem.classList.add(className);
    }
  }

  return elem;
};

type CreateInput = (
  type: string, className: string | string[],
  value?: string, placeholder?: string) => HTMLInputElement;

export const createInput: CreateInput = (
  type: string,
  className: string | string[],
  value?: string,
  placeholder?: string,
) => {
  const elem = document.createElement('input') as HTMLInputElement;
  elem.type = type;
  if (value) {
    elem.value = value;
  }

  if (placeholder) {
    elem.placeholder = placeholder;
  }

  if (className) {
    if (Array.isArray(className)) {
      elem.classList.add(...className);
    } else {
      elem.classList.add(className);
    }
  }

  return elem;
};

interface Option {
  value: string;
  text: string;
  selected?: boolean;
}

type CreateSelect = (name: string, id: string, className: string, options: Option[]) => HTMLSelectElement;

export const createSelect: CreateSelect = (
  name: string,
  id: string,
  className: string,
  options: Option[],
): HTMLSelectElement => {
  const select = createTag('select', className) as HTMLSelectElement;
  select.name = name;
  select.id = id;
  const listOptions = options.map((option) => {
    const opt = createTag('option', '') as HTMLOptionElement;
    opt.value = option.value;
    opt.innerText = option.text;
    opt.selected = !!option.selected;
    return opt;
  });
  select.append(...listOptions);
  return select;
};

export function createOptionListDifficulty(num: number, selected: number): Option[] {
  const list = [];
  for (let i = 1; i <= num; i += 1) {
    list.push({
      value: `${i}`,
      text: `${i}`,
      selected: i === selected,
    });
  }
  return list;
}

type CreateImg = (link: string, className: string, alt: string) => HTMLImageElement;
export const createImg: CreateImg = (link: string, className: string, alt: string): HTMLImageElement => {
  const img = createTag('img', className) as HTMLImageElement;
  img.src = link;
  img.alt = alt;
  return img;
};

export function shuffleWordList(array: Word[] | HTMLElement[]): void {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getRandomItemFromArray(array: Word[], words: Set<Word>): Word {
  const excludeWords = Array.from(words);

  if (array.length === 1) {
    return array[0];
  }

  if (array.every((word) => excludeWords.includes(word))) {
    return array[0];
  }

  const item = array[Math.floor(Math.random() * array.length)];

  if (excludeWords.includes(item)) {
    return getRandomItemFromArray(array, words);
  }

  return item;
}

export function resetKeyDownListener():void {
  document.body.onkeydown = () :void => {};
}

export function getRandomIndexFromArray(length:number, exclude: number):number {
  if (length === 1) return 0;

  const index = Math.floor(Math.random() * length);

  if (index === exclude) {
    return getRandomIndexFromArray(length, exclude);
  }
  return index;
}
