import React from 'react';

import { PaymentContext } from '../context/PaymentContext';
import { FetchStatus, Payment } from '../types';
import { useFetch } from './useFetch';

/**
 * Used to fetch all payments. When payments exist, we do not fetch
 * anymore payments. These are then updated in cache.
 */
export const useFetchPayments = () => {
  const { allPayments, addMultiplePayments } = React.useContext(PaymentContext);
  const { fetchRequest, error, status, setStatus } = useFetch<Payment[]>();

  const fetchAllPayments = async () => {
    // do not fetch if we already have payments
    if (allPayments.length > 0) {
      setStatus(FetchStatus.DONE);
      return;
    }

    const paymentsResponse = await fetchRequest({ endpoint: '/payments' });

    // update cache
    paymentsResponse && addMultiplePayments(paymentsResponse);
  };

  return { fetchAllPayments, allPayments, status, error };
};
