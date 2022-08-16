type CreateTag = (tag: string, className: string, value: string) => HTMLElement;
export const createTag: CreateTag = (tag: string, className: string, value: string) => {
  const elem = document.createElement(tag);
  elem.innerHTML = value;
  if (className) {
    elem.classList.add(className);
  }
  return elem;
};

type CreateInput = (type: string, value: string, className: string) => HTMLElement;
export const createInput: CreateInput = (type: string, value: string, className: string) => {
  const elem = document.createElement('input') as HTMLInputElement;
  elem.type = type;
  elem.value = value;
  if (className) {
    elem.classList.add(className);
  }
  return elem;
};
