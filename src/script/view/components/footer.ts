import { createTag } from '../../helper/helper';
import { CSSClass, HTMLPageFreeText, FooterGithubUser } from '../../interface/freeText';

export class Footer {
  public create():HTMLElement {
    const footer: HTMLElement = createTag('footer', CSSClass.footer);
    const wrapper: HTMLElement = createTag('div', CSSClass.footerWrapper);
    const year: HTMLElement = createTag('div', CSSClass.footerYear, HTMLPageFreeText.footerYear);
    wrapper.append(this.rsSchool(), this.gitHubs(), year);
    footer.append(wrapper);
    return footer;
  }

  public rsSchool():HTMLElement {
    const rsSchool: HTMLElement = createTag('div', CSSClass.footerRSSchool);
    const url = createTag('a', CSSClass.footerLink) as HTMLBaseElement;
    url.innerHTML = '<img src = "./assets/svg/rs_school_js.svg" alt = "rsSchool">';
    url.href = HTMLPageFreeText.urlToRSSchool;
    rsSchool.append(url);
    return rsSchool;
  }

  public gitHubs():HTMLElement {
    const gitHubs: HTMLElement = createTag('div', CSSClass.footerGithub);
    const url1 = createTag('a', CSSClass.footerLink, FooterGithubUser.nameMax) as HTMLAnchorElement;
    url1.target = '_blank';
    url1.href = FooterGithubUser.urlToGitHubeMax;
    const url2 = createTag('a', CSSClass.footerLink, FooterGithubUser.nameAnatoli) as HTMLAnchorElement;
    url2.target = '_blank';
    url2.href = FooterGithubUser.urlToGitHubeAnatoli;
    const url3 = createTag('a', CSSClass.footerLink, FooterGithubUser.nameIlya) as HTMLAnchorElement;
    url3.target = '_blank';
    url3.href = FooterGithubUser.urlToGitHubeIlya;
    gitHubs.append(url1, url2, url3);
    return gitHubs;
  }
}
