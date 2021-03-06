import React from 'react';
import { Cell, DateOfMonth } from '../styled-components/CalendarCell';
import DaysOfWeek from './DaysOfWeek';

export default class Month extends React.PureComponent {
  isToday(date) {
    return date.toDateString() === new Date().toDateString();
  }

  render() {
    const { month, name } = this.props;
    // Most weeks don't start at Sunday, weekOffset is the gaps
    const weekOffset = month[0].dayOfWeek;
    const weekSpan = Math.ceil((month.length + weekOffset) / 7);
    var weekNum = [<Cell key={-1}>WN</Cell>];
    var monthPadding = [];

    // For simplicity, to insert weekNum just calculate how many week does that
    //   month span, pick the first weekNum and increase it
    for (let i = 0; i < weekSpan; i++) {
      weekNum.push(
        <Cell key={i}>
          {month[0].weekNum + i !== 0 ? month[0].weekNum + i : ''}
        </Cell>
      );
    }

    // Add a div per weekOffset before actual dates
    for (let i = 0; i < weekOffset; i++) {
      monthPadding.push(<Cell key={i} />);
    }

    return (
      <div className="month-container">
        <div className="month-name">{name}</div>
        <div className="week-nums">{weekNum}</div>
        <div className="cells">
          <DaysOfWeek />
          {monthPadding}
          {month.map((day, i) => (
            <DateOfMonth today={this.isToday(day.raw)} key={day.dateOfMonth}>
              {day.dateOfMonth}
            </DateOfMonth>
          ))}
        </div>
      </div>
    );
  }
}
