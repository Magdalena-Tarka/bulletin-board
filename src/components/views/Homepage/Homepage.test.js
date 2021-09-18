import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent posts={[]} activePosts={[]} match={{params: {id: 1}, isExact: true, path: '', url: ''}} />);
    expect(component).toBeTruthy();
  });
});
