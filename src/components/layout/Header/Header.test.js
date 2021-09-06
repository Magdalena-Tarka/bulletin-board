import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './__pascalCase_name__';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<HeaderComponent />);
    expect(component).toBeTruthy();
  });
});
