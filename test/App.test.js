import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App';
import Calendar from '../src/components/Calendar';

describe('<App />', () => {
  test('should renders calendar', () => {
    const wrapper = shallow(<App />);
    const { year, mode } = wrapper.state();
    const calendarProps = wrapper.find(Calendar).props();
    expect(wrapper.find(Calendar)).toHaveLength(1);
    expect(calendarProps.year).toBe(year);
    expect(calendarProps.mode).toBe(mode);
  });

  test('should increase and decrease year', () => {
    // React simulate click example
    const spyNext = jest.spyOn(App.prototype, 'handleGoNextClick');
    const spyBack = jest.spyOn(App.prototype, 'handleGoBackClick');
    const wrapper = shallow(<App />);
    const thisYear = wrapper.state().year;

    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.state().year).toEqual(thisYear - 1);
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.state().year).toEqual(thisYear);
    expect(spyNext).toHaveBeenCalledTimes(1)
    expect(spyNext).toHaveBeenCalledTimes(1)
  });

  test('should change calendar mode', () => {
    const wrapper = shallow(<App />);
    // React component method test example
    wrapper.instance().handleChangeMode({
      currentTarget: { value: 'Inclusive' },
      target: { value: 'Inclusive' }
    });
    expect(wrapper.state().mode).toEqual('Inclusive');
  });
});
