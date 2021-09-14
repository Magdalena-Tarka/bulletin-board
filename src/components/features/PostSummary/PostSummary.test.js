import React from 'react';
import { shallow } from 'enzyme';
import { PostSummaryComponent } from './__pascalCase_name__';

describe('Component PostSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostSummaryComponent />);
    expect(component).toBeTruthy();
  });
});
