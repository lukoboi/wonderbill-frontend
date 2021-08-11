import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';

import { PaymentForm } from './PaymentForm';

describe('when <PaymentForm /> renders', () => {
  it('should be in create mode by default', () => {
    render(<PaymentForm />);
    expect(
      screen.getByRole('button', { name: /add new payment/i })
    ).toBeInTheDocument();
  });

  describe('and the form is in edit mode', () => {
    it('should show the edit buttons', () => {
      render(<PaymentForm editMode />);
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /delete/i })
      ).toBeInTheDocument();
    });
  });

  describe('and no fields are filled', () => {
    it('should display an error message on submit', async () => {
      render(<PaymentForm />);

      userEvent.click(screen.getByText(/add new payment/i));

      const formErrors = await screen.findAllByTestId('formError');
      expect(formErrors.length).toBe(4);
    });
  });

  // TODO: if more time add validation unit tests
});
