import React from 'react';
import { useHistory } from 'react-router-dom';

import { PaymentContext } from '../context/PaymentContext';
import { Payment } from '../types';
import { useFetch } from './useFetch';

/**
 * Used to add a payment. Updates this on the server and in cache
 */
export const useAddPayment = () => {
  const { addPayment } = React.useContext(PaymentContext);
  const history = useHistory();

  const { fetchRequest, error, status } = useFetch<Payment>();

  const addSinglePayment = async (payment: Payment) => {
    const paymentResponse = await fetchRequest({
      endpoint: '/payments',
      method: 'POST',
      body: JSON.stringify(payment),
    });

    // update cache
    paymentResponse && addPayment(paymentResponse);

    history.push('/');
  };

  return { addSinglePayment, error, status };
};
