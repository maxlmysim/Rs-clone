import { Word } from './server';

export interface ModelAudioGame {
  'currentNumWord': number,
  'lastNumWord': number,
  'difficulty': number,
  'listWords': Word[],
  'rightAnswerOnPage': HTMLElement,
  'wrongAnswerOnPage': HTMLElement[],
  'listAnswerOnPage':HTMLElement[],
  'isShowAnswer': boolean,
  'rightAnswers': Word[],
  'wrongAnswers': Word[],
  serialCorrectAnswer: number,
  maxSerialCorrectAnswer: number,
  'reset': ()=>void,
  'resetAll': ()=>void,
  'applySettingsNextPage': ()=>void,
}
