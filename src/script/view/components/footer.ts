import { createTag } from "../../helper/helper";
export class Footer {
    public create():HTMLElement {
        const footer: HTMLElement = createTag('footer', 'footer', '');
        const wrapper: HTMLElement = createTag('div', 'footer-wrapper','');
        const year: HTMLElement = createTag('div', 'footer__year','2022');
        wrapper.append();
        footer.append(wrapper);
        return footer;
    }

    public rsSchool():HTMLElement {
        const rsSchool: HTMLElement = createTag('div', 'footer__rsschool','');
        const url = createTag('a', 'link','') as HTMLBaseElement;
        url.href = 'https://rs.school/js/';
        rsSchool.append(url);
        return rsSchool;
    }

    public gitHubs():HTMLElement {
        const gitHubs: HTMLElement = createTag('div', 'footer__github','');
        const url1 = createTag('a', 'link', 'maxlmysim') as HTMLBaseElement;
        url1.href = 'https://github.com/maxlmysim';
        const url2 = createTag('a', 'link','AnatoliHaralchuk') as HTMLBaseElement;
        url2.href = 'https://github.com/AnatoliHaralchuk';
        const url3 = createTag('a', 'link','Naysa3r') as HTMLBaseElement;
        url3.href = 'https://github.com/naysa3r';
        gitHubs.append(url1, url2, url3);
        return gitHubs;
    }
}