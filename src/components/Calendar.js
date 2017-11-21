import React from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MS_PER_DAY = 1000 * 3600 * 24;

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

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

  isToday(date) {
    return date.toDateString() === new Date().toDateString();
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

  renderSingleMonth(month, name) {
    // Most weeks don't start at Sunday, weekOffset is the gaps
    const weekOffset = month[0].dayOfWeek;
    const weekSpan = Math.ceil((month.length + weekOffset) / 7);
    var weekNums = [];
    var dayNames = [];
    var monthPadding = [];

    // For simplicity, to insert weekNums just calculate how many week does that
    //   month span, pick the first weekNums and increase it
    for (let i = 0; i < weekSpan; i++) {
      weekNums.push(
        <div key={i}>
          {month[0].weekNums + i !== 0 ? month[0].weekNums + i : ''}
        </div>
      );
    }

    // Create days of week name: Sunday, Monday, Tuesday...
    for (let i = 0; i < DAYS.length; i++) {
      dayNames.push(
        <div key={i} className="days-name">
          {DAYS[i]}
        </div>
      );
    }

    // Add a div per weekOffset before actual dates
    for (let i = 0; i < weekOffset; i++) {
      monthPadding.push(<div key={i} />);
    }

    return (
      <div className="month-container" key={name}>
        <div className="week-nums">
          <div>WN</div>
          {weekNums}
        </div>
        <div className="cells">
          {dayNames}
          {monthPadding}
          {month.map((day, i) => (
            <div
              className={this.isToday(day.raw) ? 'today' : null}
              key={day.dateOfMonth}
            >
              {day.dateOfMonth}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { year, mode } = this.props;
    const repo = this.makeRepo(year, mode);

    return (
      <div>{repo.map((v, i) => this.renderSingleMonth(v, MONTHS[i]))}</div>
    );
  }
}
