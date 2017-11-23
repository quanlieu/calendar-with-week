import React from 'react';
import Month from './Month';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const MS_PER_DAY = 1000 * 3600 * 24;

export default class Calendar extends React.PureComponent {
  countDay(y) {
    const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    return isLeapYear ? 366 : 365;
  }

  // Repo is a POJO that contains 12 months for rendering purpose
  makeRepo(year, mode) {
    const days = this.countDay(year);
    const firstDay = new Date(year, 0, 1);
    const firstDayInMs = firstDay.getTime();
    const firstSundayIndex = this.indexOfFirstSundayOfYear(year, mode);

    var repo = [[], [], [], [], [], [], [], [], [], [], [], []]; // 12 months
    var weekNums = 0;
    if (mode === 'Inclusive' && firstSundayIndex) {
      weekNums = 1;
    }

    for (let i = 0; i < days; i++) {
      if ((i - firstSundayIndex) % 7 === 0) {
        weekNums++;
      }

      const date = new Date(firstDayInMs + i * MS_PER_DAY);
      const month = date.getMonth();
      repo[month].push({
        dateOfMonth: date.getDate(),
        dayOfWeek: date.getDay(),
        weekNums,
        raw: date
      });
    }

    return repo;
  }

  indexOfFirstSundayOfYear(year) {
    const firstDayInMs = new Date(year, 0, 1).getTime();
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayInMs + i * MS_PER_DAY);
      if (date.getDay() === 0) {
        return i;
      }
    }
  }

  render() {
    const { year, mode } = this.props;
    const repo = this.makeRepo(year, mode);

    return (
      <div>
        {repo.map((v, i) => (
          <Month
            month={v}
            name={MONTHS[i]}
            key={MONTHS[i]}
          />
        ))}
      </div>
    );
  }
}
