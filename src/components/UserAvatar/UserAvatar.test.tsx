import { render } from '@testing-library/react';
import React from 'react';

import UserAvatar from './UserAvatar';

describe('user avatar', () => {
  it('renders with an image only', () => {
    expect.assertions(2);
    const { container, queryByTestId } = render(
      <UserAvatar image="https://www.google.com/56dp.png" />
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('avatarImage')).toBeInTheDocument();
  });

  it('renders with a name only', () => {
    expect.assertions(2);
    const { container, queryByText } = render(<UserAvatar name="John Doe" />);
    expect(container).toMatchSnapshot();
    expect(queryByText('John Doe')).toBeInTheDocument();
  });

  it('renders with both the avatar and image', () => {
    expect.assertions(3);
    const { container, queryByTestId, queryByText } = render(
      <UserAvatar
        image="https://www.google.com/56dp.png"
        name="John Doe"
        size={[100, 100]}
      />
    );
    expect(container).toMatchSnapshot();
    expect(queryByText('John Doe')).toBeInTheDocument();
    expect(queryByTestId('avatarImage')).toBeInTheDocument();
  });
});
