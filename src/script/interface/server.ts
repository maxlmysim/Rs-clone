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

export interface ResponseUpdateToken {
  'token': string,
  'refreshToken': string,
}

export interface Statistics {
  'learnedWords': number,
  'optional': object
}

export interface WordSettings {
  'difficulty'?: string;
  'optional'?: object;
}
