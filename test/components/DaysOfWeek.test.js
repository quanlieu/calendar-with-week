import React from 'react';
import { shallow } from 'enzyme';

import DaysOfWeek from '../../src/components/DaysOfWeek';
import { DayName } from '../../src/styled-components/CalendarCell';

xdescribe('<DaysOfWeek />', () => {
  test('should renders 7 days', () => {
    // Inability to test React 16 Fragments, Enzyme is not support yet
    const component = shallow(<DaysOfWeek />);
  });
});
