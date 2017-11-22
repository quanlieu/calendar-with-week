import React from 'react';
import { DayName } from '../styled-components/CalendarCell';

const DaysOfWeek = props => {
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dayNames = [];

  for (let i = 0; i < DAYS.length; i++) {
    dayNames.push(<DayName key={i}>{DAYS[i]}</DayName>);
  }

  return dayNames;
};

export default DaysOfWeek;
