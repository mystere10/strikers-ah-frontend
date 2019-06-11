import React from 'react';
import { shallow } from 'enzyme';
import '../enzymeConfig';
import App from '../App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
