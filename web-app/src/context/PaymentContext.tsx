import React from 'react';

import { Payment } from '../types';

interface PaymentContextValues {
  /**
   * Holds all Payments in cache
   */
  allPayments: Payment[];
  /**
   * Used to add a list of multiple Payments to the cache
   */
  addMultiplePayments: (multiplePayments: Payment[]) => void;
  /**
   * Used to add a single Payment to the cache
   */
  addPayment: (newPayment: Payment) => void;
  /**
   * Removes a single Payment from the cache using the paymentId
   */
  removePayment: (paymentId: string) => void;
  /**
   * Updates an existing Payment in the cache
   */
  updatePayment: (paymentToUpdate: Payment) => void;
}

export const PaymentContext = React.createContext<PaymentContextValues>({
  allPayments: [],
  addMultiplePayments: () => {},
  addPayment: () => {},
  removePayment: () => {},
  updatePayment: () => {},
});

interface PaymentContextProviderProps {
  children: React.ReactNode;
}

export const PaymentContextProvider = ({
  children,
}: PaymentContextProviderProps) => {
  const [allPayments, setAllPayments] = React.useState<Payment[]>([]);

  const addMultiplePayments = (addMultiplePayments: Payment[]) => {
    setAllPayments((currentPayments) => [
      ...currentPayments,
      ...addMultiplePayments,
    ]);
  };

  const addPayment = (newPayment: Payment) => {
    setAllPayments((currentPayments) => [...currentPayments, newPayment]);
  };

  const removePayment = (paymentId: string) => {
    setAllPayments((currentPayments) =>
      currentPayments.filter((payment) => payment.id !== paymentId)
    );
  };

  const updatePayment = (paymentToUpdate: Payment) => {
    setAllPayments((currentPayments) => {
      const paymentsCopy = [...currentPayments];

      const paymentIndex = paymentsCopy.findIndex(
        (payment) => payment.id === paymentToUpdate.id
      );
      if (paymentIndex === -1) return paymentsCopy;

      paymentsCopy[paymentIndex] = paymentToUpdate;
      return paymentsCopy;
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        allPayments,
        addMultiplePayments,
        addPayment,
        removePayment,
        updatePayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
