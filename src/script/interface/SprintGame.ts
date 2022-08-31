import { Word } from './server';

export interface ModelSprintGame {
  'currentNumWord': number,
  'lastNumWord': number,
  'difficulty': number,
  'listWords': Word[],
  'isTrue': boolean,
  'rightAnswers': Word[],
  'wrongAnswers': Word[],
  'account': number,
  englishWord: string,
  translateWord: string,
  serialCorrectAnswer: number,
  'resetAll': ()=>void,
  'applySettingsNextPage': ()=>void,
}
