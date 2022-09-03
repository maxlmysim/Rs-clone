import { ModelSprintGame } from '../../../interface/SprintGame';

export const modelSprintGame: ModelSprintGame = {
  isTrue: false,
  englishWord: '',
  translateWord: '',
  listWords: [],
  currentNumWord: 0,
  lastNumWord: 0,
  difficulty: 2,
  rightAnswers: [],
  wrongAnswers: [],
  account: 0,
  serialCorrectAnswerForAccount: 0,
  serialCorrectAnswer: 0,
  maxSerialCorrectAnswer: 0,
  isCurrentAnswerRights: false,

  resetAll() {
    this.listWords = [];
    this.currentNumWord = 0;
    this.lastNumWord = 0;
    this.difficulty = 2;
    this.isTrue = false;
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.account = 0;
    this.englishWord = '';
    this.translateWord = '';
    this.serialCorrectAnswerForAccount = 0;
    this.serialCorrectAnswer = 0;

    this.maxSerialCorrectAnswer = 0;
    this.isCurrentAnswerRights = false;
  },

  applySettingsNextPage() {
    this.currentNumWord += 1;
    this.isTrue = false;
    this.englishWord = '';
    this.translateWord = '';
    this.isCurrentAnswerRights = false;
  },
};
