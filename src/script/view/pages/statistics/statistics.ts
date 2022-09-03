import { createTag } from '../../../helper/helper';
import { IdPages } from '../../../interface/typeApp';
import { userInfo } from '../../../authorization/user';
import { CSSClass, StatisticsText } from '../../../interface/freeText';

export class Statistics {
  public init():HTMLElement {
    const wrapper = createTag('div', IdPages.statistics);
    // console.log(userInfo);
    if (!userInfo.login) {
      const noLogin = createTag('div', CSSClass.statisticsNoLogin, StatisticsText.noLogin);
      wrapper.append(noLogin);
    } else {
      wrapper.append(this.statisticsPage());
    }
    return wrapper;
  }

  private statisticsPage():HTMLElement {
    const wrapper = createTag('div', CSSClass.statisticsWrapper, 'Это новая станица статистики');
    return wrapper;
  }
}
