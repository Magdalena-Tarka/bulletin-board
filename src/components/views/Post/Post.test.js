import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent posts={[]} match={{params: {id: 1}, isExact: true, path: '', url: ''}} />);
    expect(component).toBeTruthy();
  });
});
