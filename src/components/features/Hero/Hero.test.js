import React from 'react';
import { shallow } from 'enzyme';
import { HeroComponent } from './__pascalCase_name__';

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(<HeroComponent />);
    expect(component).toBeTruthy();
  });
});
