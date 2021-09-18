import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const examplePost = [{
  id: '12344578',
  title: 'title',
  content: 'content',
  price: 9,
  status: 'status',
  image: 'image',
  email: 'email',
  phone: 'phone',
  location: 'location',
  publicationDate: '2021-01-01',
}];

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent editedPost={examplePost} />);
    expect(component).toBeTruthy();
  });
});
