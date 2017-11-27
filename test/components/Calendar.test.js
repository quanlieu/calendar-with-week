import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../src/components/Calendar';
import Month from '../../src/components/Month';

describe('<Calendar />', () => {
  test('should renders 12 months', () => {
    const wrapper = shallow(<Calendar year={2016} mode="Inclusive" />);
    expect(wrapper.find(Month)).toHaveLength(12);
  });
});

describe('Calendar.prototype.countDay', () => {
  test('should returns 365 days in normal year', () => {
    const days = Calendar.prototype.countDay(2017);
    expect(days).toBe(365);
  });

  test('should returns 366 days in leap year', () => {
    const days = Calendar.prototype.countDay(2016);
    expect(days).toBe(366);
  });

  test('should returns 365 days in end of century normal year', () => {
    const days = Calendar.prototype.countDay(2100);
    expect(days).toBe(365);
  });

  test('should returns 366 days in end of century leap year', () => {
    const days = Calendar.prototype.countDay(2000);
    expect(days).toBe(366);
  });
});

describe('Calendar.prototype.indexOfFirstSundayOfYear', () => {
  test('should returns 0 in 2017', () => {
    const i = Calendar.prototype.indexOfFirstSundayOfYear(2017);
    expect(i).toBe(0);
  });
  test('should returns 6 in 2018', () => {
    const i = Calendar.prototype.indexOfFirstSundayOfYear(2018);
    expect(i).toBe(6);
  });
  test('should returns 5 in 2019', () => {
    const i = Calendar.prototype.indexOfFirstSundayOfYear(2019);
    expect(i).toBe(5);
  });
  test('should returns 4 in 2020', () => {
    const i = Calendar.prototype.indexOfFirstSundayOfYear(2020);
    expect(i).toBe(4);
  });
  test('should returns 2 in 2021', () => {
    const i = Calendar.prototype.indexOfFirstSundayOfYear(2021);
    expect(i).toBe(2);
  });
});

describe('Calendar.prototype.makeRepo', () => {
  const ex2017 = Calendar.prototype.makeRepo(2017, 'Exclusive');
  const in2017 = Calendar.prototype.makeRepo(2017, 'Inclusive');
  const ex2016 = Calendar.prototype.makeRepo(2016, 'Exclusive');
  const in2016 = Calendar.prototype.makeRepo(2016, 'Inclusive');

  test('should return 12 months no matter what', () => {
    expect(
      ex2017.length === in2017.length && ex2017.length === 12
    ).toBeTruthy();
    expect(
      ex2016.length === in2016.length && ex2016.length === 12
    ).toBeTruthy();
  });

  test('2017 week num both mode should be the same', () => {
    expect(ex2017[0][0].weekNum).toBe(in2017[0][0].weekNum);
    expect(ex2017[11][30].weekNum).toBe(in2017[11][30].weekNum);
  });

  test('2017 week num should be correct', () => {
    expect(ex2017[0][0].weekNum).toBe(1);
    expect(ex2017[0][30].weekNum).toBe(5);
    expect(ex2017[1][0].weekNum).toBe(5);
    expect(ex2017[11][30].weekNum).toBe(53);
  });

  test('2016 week num each mode should not be the same', () => {
    expect(ex2016[0][0].weekNum).not.toBe(in2016[0][0].weekNum);
    expect(ex2016[11][30].weekNum).not.toBe(in2016[11][30].weekNum);
  });

  test('2016 week num should be correct', () => {
    expect(ex2016[0][0].weekNum).toBe(0);
    expect(ex2016[0][2].weekNum).toBe(1);
    expect(ex2016[11][30].weekNum).toBe(52);

    expect(in2016[0][0].weekNum).toBe(1);
    expect(in2016[0][2].weekNum).toBe(2);
    expect(in2016[11][30].weekNum).toBe(53);
  });
});
