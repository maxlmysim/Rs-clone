export type CallBack = () => void;

export enum IdPages {
  main = 'main-page',
  ebook = 'ebook',
  dictionary = 'dictionary',
  games = 'games',
  gameAudio = 'game-audio',
  gameSprint = 'game-sprint',
  statistics = 'statistics',
  aboutTeam = 'about-team',
  review = 'review',
  aboutProject = 'about-project',
  login = 'login',

}

export enum NamePages {
  main = 'Главная',
  ebook = 'Учебник',
  dictionary = 'Словарь',
  games = 'Игры',
  statistics = 'Статистика',
  aboutTeam = 'О команде',
  review = 'Отзывы',
  aboutProject = 'O проекте',
  login = 'Регистрация',
  aboutProjectYoutube = 'Видео',
}

export interface ChartData {
  type: string;
  data: Array<number>;
}
