import { Word } from './server';

export type TColors = 0 | 1 | 2 | 3 | 4 | 5;
export type UpdWords = (group: number, page: number) => void;
export type CardBtnClass = 'hard' | 'done';
export type HardBtnSet = (word: Word) => void;

export interface CardProps {
  word: Word,
  port: string,
  userWords?: Promise<string[]>,
  playSounds: (word: Word) => void,
  hardBtnSet?: HardBtnSet,
  hardBtnRemove?: HardBtnSet,
}
export interface IUserWordsResponse {
  difficulty: string,
  id: string,
  wordId: string,
}

export interface ITextbookCardImageStyle {
  word: Word,
  port: string,
}

export interface ITextbookButtonsGroup {
  itemsLength: number;
  pagesLength: number;
  updateWords: UpdWords;
}

export interface IMenuButton {
  itemsLength: number;
  pagesLength: number;
  updateWords: UpdWords;
  setPageButtonText: React.Dispatch<React.SetStateAction<string>>
}

export interface IPageButtonsGroup {
  pagesLength: number;
  updateWords: UpdWords;
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
}

export interface UpdateWords {
  updateWords: UpdWords;
}

export interface ColorNum {
  num: TColors,
}

export interface ICardButtonsGroup {
  word: Word;
  userWords?: Promise<string[]>;
  hardBtnSet?: HardBtnSet;
  hardBtnRemove?: HardBtnSet;
}
