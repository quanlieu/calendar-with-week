import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../src/app';
import Calendar from '../src/components/Calendar';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders child tag', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Calendar)).to.have.length(1);
  });
});
