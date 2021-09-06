import React from 'react';
import { shallow } from 'enzyme';
import { {{pascalCase name}}Component } from './__pascalCase_name__';

describe('Component {{pascalCase name}}', () => {
  it('should render without crashing', () => {
    const component = shallow(<{{pascalCase name}}Component />);
    expect(component).toBeTruthy();
  });
});
