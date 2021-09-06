import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './__pascalCase_name__';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent />);
    expect(component).toBeTruthy();
  });
});
