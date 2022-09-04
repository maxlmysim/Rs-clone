import Chart from 'chart.js/auto';
import { createTag } from '../../../helper/helper';
import { IdPages } from '../../../interface/typeApp';
import { userInfo } from '../../../authorization/user';
import { CSSClass, StatisticsText } from '../../../interface/freeText';

export class Statistics {
  public init():HTMLElement {
    const wrapper = createTag('div', IdPages.statistics);
    if (!userInfo.login) {
      const noLogin = createTag('div', CSSClass.statisticsNoLogin, StatisticsText.noLogin);
      wrapper.append(noLogin);
    } else {
      wrapper.append(this.statisticsPage());
    }
    return wrapper;
  }

  private statisticsPage():HTMLElement {
    const wrapper = createTag('div', CSSClass.statisticsWrapper, 'Это новая станица статистики') as HTMLElement;
    const canvas1 = createTag('canvas', CSSClass.statisticsCanvas1) as HTMLCanvasElement;
    canvas1.getContext('2d');
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mychart = new Chart(canvas1, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    canvas1.style.width = '40rem';
    canvas1.style.height = '40rem';
    wrapper.append(canvas1);
    return wrapper;
  }
}
