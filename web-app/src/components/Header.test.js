import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('when <Header /> renders', () => {
  const headerTitle = 'header title';

  it('shows the correct title in a header', () => {
    render(<Header title={headerTitle} />);
    expect(screen.getByRole('heading')).toHaveTextContent(headerTitle);
  });
});
