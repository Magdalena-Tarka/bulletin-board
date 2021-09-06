import React from 'react';
import { shallow } from 'enzyme';
import { NotFoundComponent } from './__pascalCase_name__';

describe('Component NotFound', () => {
  it('should render without crashing', () => {
    const component = shallow(<NotFoundComponent />);
    expect(component).toBeTruthy();
  });
});
