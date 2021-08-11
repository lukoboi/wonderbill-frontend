import React from 'react';

import { PaymentContext } from '../context/PaymentContext';
import { FetchStatus, Payment } from '../types';
import { useFetch } from './useFetch';

/**
 * Used to fetch a single payment. If this exists in cache then
 * we return this.
 */
export const useFetchSinglePayment = () => {
  const { allPayments } = React.useContext(PaymentContext);

  const { fetchRequest, status, error, setStatus } = useFetch<Payment>();
  const [payment, setPayment] = React.useState<Payment>();

  const fetchSinglePayment = async (paymentId: string) => {
    // find payment in cache otherwise fetch
    const paymentInCache = allPayments.find(
      (payment) => payment.id === paymentId
    );
    if (paymentInCache) {
      setPayment(paymentInCache);
      setStatus(FetchStatus.DONE);
      return;
    }

    const paymentResponse = await fetchRequest({
      endpoint: `/payments/${paymentId}`,
    });

    // add to cache
    paymentResponse && setPayment(paymentResponse);
  };

  return { fetchSinglePayment, payment, status, error };
};
