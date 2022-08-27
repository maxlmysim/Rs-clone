import { Word } from './server';

export type TColors = 0 | 1 | 2 | 3 | 4 | 5;
export type UpdWords = (group: number, page: number) => void;

export interface CardProps {
  word: Word,
  port: string
}

export interface MenuItemLength {
  itemsLength: number;
  pagesLength: number;
  updateWords: UpdWords;
}

export interface PagesLength {
  pagesLength: number;
  updateWords: UpdWords;
}

export interface UpdateWords {
  updateWords: UpdWords;
}

export interface ColorNum {
  num: TColors,
}
