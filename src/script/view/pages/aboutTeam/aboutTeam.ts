import { createTag } from '../../../helper/helper';
import { IdPages } from '../../../interface/typeApp';
import { CSSClass, AboutTeamText, FooterGithubUser } from '../../../interface/freeText';

const maxDone: Array<string> = ['Страница регистрации и логина',
  'Игра "Спринт"', 'Игра "Aудиовызов"', 'Страница Игры', 'Создание API'];
const AnatoliDone: Array<string> = ['Главная страница', 'Страница статистики',
  'Страница «О команде»', 'Описание проекта'];
const IlyaDone: Array<string> = ['Страница Учебник', 'Страница Словарь'];

export class AboutTeam {
  public init():HTMLElement {
    const wrapper = createTag('div', IdPages.aboutTeam);
    const title = createTag('h2', CSSClass.aboutTeamTitle, AboutTeamText.aboutTeamTitle);
    const items = createTag('div', CSSClass.aboutTeamItems);
    const maxLapko = this.createDeveloper(
      AboutTeamText.maxFoto,
      FooterGithubUser.nameMax,
      FooterGithubUser.nameGithubMax,
      AboutTeamText.jobTeamLead,
    );
    maxLapko.append(this.addDoneList(maxDone));

    const Anatoli = this.createDeveloper(
      AboutTeamText.anatoliFoto,
      FooterGithubUser.nameAnatoli,
      FooterGithubUser.nameGithubAnatoli,
      AboutTeamText.jobDev,
    );
    Anatoli.append(this.addDoneList(AnatoliDone));

    const Ilya = this.createDeveloper(
      AboutTeamText.ilyaFoto,
      FooterGithubUser.nameIlya,
      FooterGithubUser.nameGithubIlya,
      AboutTeamText.jobDev,
    );
    Ilya.append(this.addDoneList(IlyaDone));
    items.append(maxLapko, Anatoli, Ilya);
    wrapper.append(title, items);
    return wrapper;
  }

  private createDeveloper(foto: string, name: string, githubName: string, job: string):HTMLElement {
    const item = createTag('div', CSSClass.aboutTeamItem, foto);
    const devName = createTag('p', CSSClass.aboutTeamItemName, name);
    const github = createTag('a', CSSClass.aboutTeamItemGithub) as HTMLAnchorElement;
    github.target = '_blank';
    github.href = FooterGithubUser.urlToGitHubeMax;
    github.innerHTML = `<img class = "${CSSClass.aboutTeamItemGithubSvg}"
    src = "./assets/svg/github.svg" alt = "github">`;
    github.append(createTag('div', CSSClass.aboutTeamItemGithubName, githubName));
    const jobDev = createTag('p', CSSClass.aboutTeamItemJob, job);
    item.append(devName, github, jobDev);
    return item;
  }

  private addDoneList(data: Array<string>):HTMLElement {
    const wrapper = createTag('ol', CSSClass.aboutTeamItemList);
    data.forEach((elem) => {
      const done = createTag('li', CSSClass.aboutTeamItemListItem, elem);
      wrapper.append(done);
    });
    return wrapper;
  }
}
