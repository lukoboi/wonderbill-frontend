import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { format } from 'date-fns';

import { Button, ButtonLevel } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { FetchStatus, Frequency, Payment } from '../types';
import { useAddPayment } from '../hooks/useAddPayment';
import { createPaymentFromForm } from '../helpers';
import { useUpdatePayment } from '../hooks/useUpdatePayment';
import { useDeletePayment } from '../hooks/useDeletePayments';

export interface PaymentFormFields {
  name: string;
  amount: string;
  startDate: string;
  frequency: string;
}

interface PaymentFormProps {
  /**
   * Toggle between edit mode and create mode
   */
  editMode?: boolean;
  /**
   * Default form values taken from a Payment. Used in conjunction with editMode
   */
  defaultPayment?: Payment;
}

export const PaymentForm = ({ editMode, defaultPayment }: PaymentFormProps) => {
  const { addSinglePayment, status: addStatus } = useAddPayment();
  const { updateSinglePayment, status: updateStatus } = useUpdatePayment();
  const { deletePayment, status: deleteStatus } = useDeletePayment();

  const disableButton = [addStatus, updateStatus, deleteStatus].includes(
    FetchStatus.PENDING
  );

  return (
    <Formik
      initialValues={{
        name: defaultPayment?.name || '',
        amount: defaultPayment?.amount.toString() || '',
        startDate:
          (defaultPayment?.startDate &&
            format(new Date(defaultPayment.startDate), 'yyyy-MM-dd')) ||
          '',
        frequency: defaultPayment?.frequency.toString() || 'default',
      }}
      validationSchema={BillFormSchema}
      onSubmit={(values) => {
        // transform string field values into a payment
        const payment: Payment = createPaymentFromForm(values);

        if (editMode) {
          // update
          payment.id = defaultPayment?.id;
          updateSinglePayment(payment);
        } else {
          addSinglePayment(payment);
        }
      }}
    >
      <Form className="flex flex-col items-center w-full space-y-6">
        <Input label="Name" name="name" />
        <Input label="Amount" name="amount" type="currency" />
        <Input label="Start date" name="startDate" type="date" />
        <Select
          label="Frequency"
          name="frequency"
          options={[
            { label: 'Weekly', value: Frequency.WEEKLY },
            { label: 'Monthly', value: Frequency.MONTHLY },
            { label: 'Annual', value: Frequency.ANNUAL },
          ]}
        />

        <div className="flex flex-col w-full px-4 pt-8 space-y-5">
          {editMode ? (
            <>
              <Button type="submit" disabled={disableButton}>
                Save
              </Button>
              <Button
                onClick={() =>
                  defaultPayment?.id && deletePayment(defaultPayment?.id)
                }
                buttonLevel={ButtonLevel.WARNING}
                disabled={disableButton}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button type="submit" disabled={disableButton}>
              Add New Payment
            </Button>
          )}
        </div>
      </Form>
    </Formik>
  );
};

const BillFormSchema = Yup.object({
  name: Yup.string().required().label('Name'),
  amount: Yup.number().required().min(1).label('Amount'),
  startDate: Yup.date()
    .required()
    .label('Start Date')
    .typeError('Please enter a start date'),
  frequency: Yup.mixed()
    .oneOf(
      Object.values(Frequency).map((val) => val.toString()),
      'Please select a frequency'
    )
    .label('Frequency'),
});
