import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../src/components/Calendar';
import Month from '../../src/components/Month';
import DaysOfWeek from '../../src/components/DaysOfWeek';
import { Cell, DateOfMonth } from '../../src/styled-components/CalendarCell';

describe('Month.prototype.isToday', () => {
  test('should return true', () => {
    expect(Month.prototype.isToday(new Date())).toBe(true);
  });

  test('should return false', () => {
    expect(Month.prototype.isToday(new Date('2000/1/1'))).toBe(false);
  });
});

describe('<Month />', () => {
  const ex2016 = Calendar.prototype.makeRepo(2016, 'Exclusive');
  const wrapper = shallow(<Month month={ex2016[0]} name="January" />);

  test('should render all days of month', () => {
    expect(wrapper.find(DateOfMonth)).toHaveLength(ex2016[0].length);
  });

  test('should render correct month padding', () => {
    expect(wrapper.find('.cells').children().find(Cell)).toHaveLength(5);
  });

  test('should render days of week', () => {
    expect(wrapper.find(DaysOfWeek)).toHaveLength(1);
  });
});
