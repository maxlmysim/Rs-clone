import { ModelAudioGame } from '../../../interface/audioGame';

export const modelAudioGame: ModelAudioGame = {
  // @ts-ignore
  rightAnswerOnPage: '',
  wrongAnswerOnPage: [],
  listAnswerOnPage: [],
  listWords: [],
  currentNumWord: 0,
  lastNumWord: 0,
  difficulty: 2,
  isShowAnswer: false,
  rightAnswers: [],
  wrongAnswers: [],

  resetAll() {
    // @ts-ignore
    this.rightAnswerOnPage = '';
    this.wrongAnswerOnPage = [];
    this.listAnswerOnPage = [];
    this.listWords = [];
    this.currentNumWord = 0;
    this.lastNumWord = 0;
    this.difficulty = 2;
    this.isShowAnswer = false;
    this.rightAnswers = [];
    this.wrongAnswers = [];
  },

  applySettingsNextPage() {
    this.currentNumWord += 1;
    this.wrongAnswerOnPage.length = 0;
    this.listAnswerOnPage.length = 0;
    this.isShowAnswer = false;
  },
};
