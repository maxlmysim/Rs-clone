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

export function shuffleWordList(array: Word[]): void {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}
