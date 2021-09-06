import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './__pascalCase_name__';

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent />);
    expect(component).toBeTruthy();
  });
});
