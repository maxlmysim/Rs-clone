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

type CreateInput = (type: string,
  className: string | string[],
  value: string,
  placeholder?: string) => HTMLInputElement;

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
