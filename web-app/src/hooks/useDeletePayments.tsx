import React from 'react';
import { useHistory } from 'react-router-dom';

import { PaymentContext } from '../context/PaymentContext';
import { useFetch } from './useFetch';

/**
 * Used to delete a payment. Updates this on the server and in cache
 */
export const useDeletePayment = () => {
  const { removePayment } = React.useContext(PaymentContext);
  const history = useHistory();
  const { fetchRequest, status, error } = useFetch();

  const deletePayment = async (paymentId: string) => {
    await fetchRequest({
      endpoint: `/payments/${paymentId}`,
      method: 'DELETE',
    });

    // remove payment from cache
    removePayment(paymentId);
    history.push('/');
  };

  return { deletePayment, status, error };
};
