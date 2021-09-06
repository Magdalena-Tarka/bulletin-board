import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './__pascalCase_name__';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent />);
    expect(component).toBeTruthy();
  });
});
