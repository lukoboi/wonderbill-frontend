import React from 'react';
import { useHistory } from 'react-router-dom';

import { PaymentContext } from '../context/PaymentContext';
import { Payment } from '../types';
import { useFetch } from './useFetch';

/**
 * Used to update an existing Payment on the server and in cache
 */
export const useUpdatePayment = () => {
  const history = useHistory();
  const { updatePayment } = React.useContext(PaymentContext);
  const { fetchRequest, status, error } = useFetch<Payment>();

  const updateSinglePayment = async (payment: Payment) => {
    const updateResponse = await fetchRequest({
      endpoint: `/payments/${payment.id}`,
      method: 'PATCH',
      body: JSON.stringify(payment),
    });

    // update in cache
    updateResponse && updatePayment(updateResponse);

    history.push('/');
  };

  return { updateSinglePayment, status, error };
};
