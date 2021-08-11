import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { PaymentItem } from './PaymentItem';
import { Frequency } from '../types';

describe('when <PaymentItem /> is rendered', () => {
  const payment = {
    id: 1,
    name: 'payment name',
    amount: 100,
    frequency: 0,
    startDate: new Date(2021, 0, 1),
  };

  it.only('should display the payment information', () => {
    render(
      <Router>
        <PaymentItem payment={payment} />
      </Router>
    );

    expect(screen.getByRole('heading')).toHaveTextContent(payment.name);
    expect(screen.getByText(`£${payment.amount}`)).toBeInTheDocument();
    expect(screen.getByText(/weekly/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toHaveTextContent(
      'Next: 13th August, 2021'
    );
  });
});
