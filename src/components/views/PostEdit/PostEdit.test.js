import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './__pascalCase_name__';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent />);
    expect(component).toBeTruthy();
  });
});
