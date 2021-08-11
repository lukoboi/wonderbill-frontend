import { Payment } from '../types';
import { PaymentItem } from './PaymentItem';

interface PaymentsListProps {
  /**
   * List of payments to display
   */
  payments: Payment[] | undefined;
}

export const PaymentsList = ({ payments }: PaymentsListProps) => {
  return (
    <section
      className="flex flex-col w-full mt-4 mb-6 space-y-4 overflow-y-auto"
      style={{ maxHeight: 600 }}
    >
      {(!payments || payments.length === 0) && (
        <p className="text-lg text-center text-wb-grey-dark">
          Start by adding a bill below
        </p>
      )}

      {payments?.map((payment) => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </section>
  );
};
