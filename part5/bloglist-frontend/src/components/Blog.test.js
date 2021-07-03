import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
// import { prettyDOM } from '@testing-library/dom';

// test('renders content', () => {
//   const blog = {
//     title: 'test',
//     // author: "test2",
//     // url: "www.test.com",
//     // likes: 0,
//   };

//   const testUser = { name: 'Test user', username: 'testuser' };
//   const component = render(<Blog blog={blog} user={testUser} />);

//   expect(component.container).toHaveTextContent('test');

//   const div = component.container.querySelector('.blog');
//   // expect(div).toHaveTextContent("test2");
//   expect(div).toBeDefined();

//   const element = component.getByText('test');
//   expect(element).toBeDefined();

//   console.log(prettyDOM(div));
// });

describe('test blog', () => {
  let component;
  let testUser;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: 'harry',
      author: 'potter',
      url: 'www.potter.com',
      likes: 9,
    };
    mockHandler = jest.fn();
    testUser = { name: 'Test user', username: 'testuser' };
    component = render(
      <Blog blog={blog} user={testUser} handleLikes={mockHandler} />
    );
  });

  test('renders blog title and author but doesnt render url/number/likes', () => {
    const compactView = component.container.querySelector('.compactView');
    expect(compactView).not.toHaveStyle('display:none');

    const detailedView = component.container.querySelector('.detailedView');
    expect(detailedView).toHaveStyle('display:none');
  });

  test('blogs url and number of likes are shown when the button controlling the shown details has been clicked. ', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const compactView = component.container.querySelector('.compactView');
    expect(compactView).toHaveStyle('display:none');

    const detailedView = component.container.querySelector('.detailedView');
    expect(detailedView).not.toHaveStyle('display:none');
  });

  test('like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
