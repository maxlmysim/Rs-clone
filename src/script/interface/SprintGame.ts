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
  serialCorrectAnswerForAccount: number,
  serialCorrectAnswer: number,
  maxSerialCorrectAnswer:number,
  isCurrentAnswerRights: boolean,
  'resetAll': ()=>void,
  'applySettingsNextPage': ()=>void,
}
