import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { PaymentsList } from './PaymentsList';

describe('when <PaymentsList /> renders', () => {
  const payments = new Array(5).fill(null).map((a, index) => ({
    id: index,
    name: `name ${index}`,
    amount: index + 1 * 10,
    frequency: 0,
    startDate: new Date(2021, 0, index + 1),
  }));

  describe('and there are no payments', () => {
    it('should show a message to add a payment', () => {
      render(
        <Router>
          <PaymentsList />
        </Router>
      );
      expect(screen.getByText(/start/i)).toHaveTextContent(
        'Start by adding a bill below'
      );
    });
  });

  describe('and there are multiple payments', () => {
    it('should display these on the page', () => {
      render(
        <Router>
          <PaymentsList payments={payments} />
        </Router>
      );

      payments.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });
});
