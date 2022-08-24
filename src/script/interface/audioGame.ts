import { Word } from './server';

export interface ModelAudioGame {
  'currentNumWord': number,
  'quantityWords': number,
  'difficulty': number,
  'listWords': Word[]
}
