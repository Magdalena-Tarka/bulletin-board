import React from 'react';
import { shallow } from 'enzyme';
import { FooterComponent } from './__pascalCase_name__';

describe('Component Footer', () => {
  it('should render without crashing', () => {
    const component = shallow(<FooterComponent />);
    expect(component).toBeTruthy();
  });
});
