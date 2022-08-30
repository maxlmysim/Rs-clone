import { Word } from './server';

export interface ModelAudioGame {
  'currentNumWord': number,
  'lastNumWord': number,
  'difficulty': number,
  'listWords': Word[],
  'rightAnswerOnPage': HTMLElement,
  'wrongAnswerOnPage': HTMLElement[],
  'isShowAnswer': boolean,

}
