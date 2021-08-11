import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { calculateNextPayment } from '../helpers';
import { Frequency, Payment } from '../types';

interface PaymentItemProps {
  /**
   * Payment object
   */
  payment: Payment;
}

export const PaymentItem = ({ payment }: PaymentItemProps) => {
  const { id, name, amount, frequency, startDate } = payment;
  const nextPaymentDate = calculateNextPayment(new Date(startDate), frequency);

  return (
    <Link to={`/edit/${id}`}>
      <div className="flex flex-col w-full px-2 py-1 space-y-2 border-b-2 border-wb-grey-light hover:opacity-70">
        <section className="flex justify-between text-wb-grey-dark">
          <h3 className="text-2xl">{name}</h3>
          <span className="text-xl">£{amount}</span>
        </section>
        <section className="flex justify-between text-lg text-wb-grey">
          <span className="capitalize">
            {Frequency[frequency].toLowerCase()}
          </span>
          <span>Next: {format(nextPaymentDate, 'do MMMM, yyyy')}</span>
        </section>
      </div>
    </Link>
  );
};
