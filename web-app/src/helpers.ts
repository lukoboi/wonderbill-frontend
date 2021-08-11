import { PaymentFormFields } from './components/PaymentForm';
import { ONE_MONTH, ONE_WEEK, ONE_YEAR } from './constants';
import { Frequency } from './types';

const FrequencyMap = new Map([
  [Frequency.WEEKLY, ONE_WEEK],
  [Frequency.MONTHLY, ONE_MONTH],
  [Frequency.ANNUAL, ONE_YEAR],
]);

export const calculateNextPayment = (startDate: Date, frequency: Frequency) => {
  if (!startDate || frequency === undefined) return new Date();

  const currentDate = new Date();
  const timeFrequency = FrequencyMap.get(parseInt(frequency.toString()))!;
  const diffNowAndStart = currentDate.getTime() - startDate.getTime();

  const nextPaymentTime =
    Math.ceil(diffNowAndStart / timeFrequency) * timeFrequency +
    startDate.getTime();

  return new Date(nextPaymentTime);
};

// used to transform form values to Payment
export const createPaymentFromForm = (formFields: PaymentFormFields) => {
  return {
    ...formFields,
    amount: parseFloat(formFields.amount) || 0,
    startDate: new Date(formFields.startDate || 0),
    frequency: parseInt(formFields.frequency) || 0,
  };
};
