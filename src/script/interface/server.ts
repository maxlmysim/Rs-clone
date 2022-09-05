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
  'textExampleTranslate': string,
  '_id'?: string,
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

export interface ResponseUpdateToken {
  'token': string,
  'refreshToken': string,
}

export interface UserAllWords {
  'difficulty'?: string;
  'optional': WordOptions;
  'id': string;
  'wordId': string;
}

export interface WordSettings {
  'difficulty'?: string;
  'optional': WordOptions;
}

export interface WordOptions {
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
  learnedWords: number,
  optional: StatisticsOptional,
}

export interface StatisticsOptional {
  [key: string]: {
    countNewWords: number,
    rightAnswers: number,
    wrongAnswers: number
    serialRightAnswers: number,
    gameSprint?: StatisticsGame,
    gameAudioCall?: StatisticsGame,
  }
}

export interface StatisticsGame {
  countNewWords: number,
  rightAnswers: number,
  wrongAnswers: number
  serialRightAnswers: number
}
