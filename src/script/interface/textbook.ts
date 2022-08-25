import { Word } from './server';

export type TColors = 0 | 1 | 2 | 3 | 4 | 5;

export interface CardProps {
  word: Word,
  port: string
}

export interface MenuItemLength {
  itemsLength: number;
}

export interface ColorNum {
  num: TColors,
}
