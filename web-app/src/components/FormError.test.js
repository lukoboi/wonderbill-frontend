import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { FormError } from './FormError';

describe('when <FormError /> renders', () => {
  const errorMessage = 'error text';

  it('shows the error message text', () => {
    render(<FormError>{errorMessage}</FormError>);
    expect(screen.getByTestId('formError')).toHaveTextContent(errorMessage);
  });

  it('has red text', () => {
    render(<FormError>{errorMessage}</FormError>);
    expect(screen.getByTestId('formError')).toHaveClass('text-wb-red');
  });
});
