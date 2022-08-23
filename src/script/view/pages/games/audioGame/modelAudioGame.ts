import { Word } from '../../../../interface/server';

interface ModelAudioGame {
  'currentNumWord': number,
  'quantityWords': number,
  'currentWord': Word,
  'difficulty': number,
  'listWords': Word[]
}
export const modelAudioGame: ModelAudioGame = {
  listWords: [],
  currentNumWord: 0,
  quantityWords: 0,
  currentWord: {
    id: '',
    group: 0,
    page: 0,
    word: '',
    image: '',
    audio: '',
    audioMeaning: '',
    audioExample: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    wordTranslate: '',
    textMeaningTranslate: '',
    textExampleTranslate: '',
  },
  difficulty: 2,
};
