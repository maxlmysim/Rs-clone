export interface Word {
  'id': string,
  'group': number,
  'page': number,
  'word': string,
  'image': string,
  'audio': string,
  'audioMeaning': string,
  'audioExample': string,
  'textMeaning': string,
  'textExample': string,
  'transcription': string,
  'wordTranslate': string,
  'textMeaningTranslate': string,
  'textExampleTranslate': string
}

export interface User {
  'name': string,
  'email': string,
  'password': string
}

export interface UserSettings {
  'login': boolean,
  'token': string,
  'refreshToken': string,
  'userId': string,
  'name': string
}

export interface UserAllWords {
  'difficulty': string,
  'id': string,
  'wordId': string,
  'optional'?: WordOptions;
}

export interface ResponseUpdateToken {
  'token': string,
  'refreshToken': string,
}

export interface WordSettings {
  'difficulty'?: string;
  'optional': WordOptions;
}

interface WordOptions {
  isWas: boolean;
  isDelete: boolean;
  isLearned: boolean;
  correctAnswerRow: number;
  gameSprint?: CountAnswersForGame
  gameAudioCall?: CountAnswersForGame
}

export interface CountAnswersForGame {
  rightCountAnswers: number;
  wrongCountAnswers: number;
}

export interface Statistics {
  'learnedWords': number,
  'optional': {
    [key: string]: {
      countNewWords: number,
      rightAnswers: number,
      wrongAnswers: number
      serialRightAnswers: number,
      gameSprint?: {
        countNewWords: number,
        rightAnswers: number,
        wrongAnswers: number
        serialRightAnswers: number
      },
      gameAudioCall?: {
        countNewWords: number,
        rightAnswers: number,
        wrongAnswers: number
        serialRightAnswers: number
      },
    }
  }
}
