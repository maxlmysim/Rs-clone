import Chart from 'chart.js/auto';
import { createTag } from '../../../helper/helper';
import { IdPages } from '../../../interface/typeApp';
import { userInfo } from '../../../authorization/user';
import { CSSClass, StatisticsText } from '../../../interface/freeText';
import { StatisticsController } from './statisticsController';
import { StatisticsOptional, Statistics } from '../../../interface/server';

export class StatisticsView {
  public init():HTMLElement {
    const wrapper = createTag('div', IdPages.statistics);
    if (!userInfo.login) {
      const noLogin = createTag('div', CSSClass.statisticsNoLogin, StatisticsText.noLogin);
      wrapper.append(noLogin);
    } else {
      const firstName: string = userInfo.name[0].toUpperCase() + userInfo.name.slice(1);
      const text = createTag('p', CSSClass.statisticsTitle, `${firstName}\`s statistics`);
      const controller = new StatisticsController();
      controller.init()
        .then((response) => {
          console.log(response);
          wrapper.append(text, this.statisticsPage(response));
        });
    }
    return wrapper;
  }

  private statisticsPage(data:Statistics):HTMLElement {
    const wrapper = createTag('div', CSSClass.statisticsWrapper) as HTMLElement;
    const carDay = createTag('div', CSSClass.statisticsCurDay, 'Статистика по мини-играм') as HTMLElement;
    const canvasCurDay = createTag('canvas', '') as HTMLCanvasElement;
    canvasCurDay.getContext('2d');
    this.canvasCurDay(canvasCurDay, data.optional);
    carDay.append(canvasCurDay);
    const allDay = createTag('div', CSSClass.statisticsAllDay, 'Статистика за день') as HTMLElement;
    const canvasAllDay = createTag('canvas', '') as HTMLCanvasElement;
    canvasAllDay.getContext('2d');
    this.canvasAllDay(canvasAllDay, data.optional, data.learnedWords);
    allDay.append(canvasAllDay);
    const timeForDay = createTag(
      'div',
      CSSClass.statisticsTimeForDay,
      'Статистика новых слов по дням',
    ) as HTMLElement;
    const canvasTimeForDay = createTag('canvas', '') as HTMLCanvasElement;
    canvasTimeForDay.getContext('2d');
    this.canvasTimeForDay(canvasTimeForDay, data.optional);
    timeForDay.append(canvasTimeForDay);
    const timeForAll = createTag(
      'div',
      CSSClass.statisticsTimeForAll,
      'Статистика увеличения изученных слов по дням',
    ) as HTMLElement;
    const canvasTimeForAll = createTag('canvas', '') as HTMLCanvasElement;
    canvasTimeForAll.getContext('2d');
    this.canvasTimeForAll(canvasTimeForAll, data.optional, data.learnedWords);
    timeForAll.append(canvasTimeForAll);
    wrapper.append(carDay, allDay, timeForDay, timeForAll);
    return wrapper;
  }

  private canvasCurDay(canvas:HTMLCanvasElement, data:StatisticsOptional):void {
    const curDay = Object.keys(data)[Object.keys(data).length - 1];
    const games = Object.keys(data[curDay]).filter((el) => (el === 'gameSprint') || (el === 'gameAudioCall'));
    const one = data[curDay][games[0]];
    const two = data[curDay][games[1]];
    let gameSets:Array<number> | null = null;
    let gameSetsTwo:Array<number> | null = null;
    if (one) gameSets = Object.values(one);
    if (two) gameSetsTwo = Object.values(two);
    let gameSprint = [0, 0, 0];
    let gameAudio = [0, 0, 0];
    if (gameSets) {
      gameSprint = [gameSets[0], Math.floor((gameSets[1] / gameSets[0]) * 100), gameSets[3]];
    }
    if (gameSetsTwo) {
      gameAudio = [gameSetsTwo[0], Math.floor((gameSetsTwo[1] / gameSetsTwo[0]) * 100), gameSetsTwo[3]];
    }
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mychart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: games,
        datasets: [{
          label: 'новые слова',
          data: [gameSprint[0], gameAudio[0]],
          backgroundColor: [
            'rgba(80, 150, 132, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'правильные, %',
          data: [gameSprint[1], gameAudio[1]],
          backgroundColor: [
            'rgba(230, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'серия правильных ответов',
          data: [gameSprint[2], gameAudio[2]],
          backgroundColor: [
            'rgba(190, 60, 64, 0.5)',
          ],
          borderColor: [
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
  }

  private canvasAllDay(canvas:HTMLCanvasElement, data:StatisticsOptional, learnWord: number):void {
    const curDay = Object.keys(data)[Object.keys(data).length - 1];
    const prosent = Math.trunc((data[curDay].rightAnswers / data[curDay].countNewWords) * 100);
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mychart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['start', 'Current'],
        datasets: [{
          label: 'Количество новых слов',
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 99, 132, 0.7)',
          ],
          data: [0, data[curDay].countNewWords],
          borderColor: [
            'rgba(255, 99, 132, 0.7)',
          ],
          borderWidth: 1.5,
        },
        {
          label: 'Количество изученных слов',
          data: [0, learnWord],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1.5,
        },
        {
          label: 'Правильных ответов, %',
          data: [0, prosent],
          backgroundColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1.5,
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
  }

  private canvasTimeForDay(canvas:HTMLCanvasElement, data:StatisticsOptional):void {
    const days = Object.keys(data);
    const dates = days.map((el) => {
      const d = el.split('.');
      return `${d[0]}.${+d[1] + 1}.2022`;
    });
    const rightAnsver = days.map((el) => data[el].countNewWords);
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mychart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Количество новых слов по дням',
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
          ],
          data: rightAnsver,
          borderColor: [
            'rgba(255, 99, 132, 0.7)',
          ],
          borderWidth: 1.5,
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
  }

  private canvasTimeForAll(canvas:HTMLCanvasElement, data:StatisticsOptional, learnWord: number):void {
    const days = Object.keys(data);
    const dates = days.map((el) => {
      const d = el.split('.');
      return `${d[0]}.${+d[1] + 1}.2022`;
    });
    // const rightAnsver = days.map((el) => data[el].countNewWords);
    // const upperRightAnsver = rightAnsver.map((n, i, a) => a.reduce((acc, m, j) => acc + m * (j <= i), 0));
    //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mychart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Увеличение изученных слов по дням',
          backgroundColor: [
            'rgba(38, 5, 252, 1)',
          ],
          data: [learnWord],
          borderColor: [
            'blue',
          ],
          borderWidth: 1.5,
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
  }
}
