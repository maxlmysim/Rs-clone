import { ModelSprintGame } from '../../../interface/SprintGame';

export const modelSprintGame: ModelSprintGame = {
  isTrue: false,
  listWords: [],
  currentNumWord: 0,
  lastNumWord: 0,
  difficulty: 2,
  rightAnswers: [],
  wrongAnswers: [],

  resetAll() {
    this.listWords = [];
    this.currentNumWord = 0;
    this.lastNumWord = 0;
    this.difficulty = 2;
    this.isTrue = false;
    this.rightAnswers = [];
    this.wrongAnswers = [];
  },

  applySettingsNextPage() {
    this.currentNumWord += 1;
    this.isTrue = false;
  },
};
