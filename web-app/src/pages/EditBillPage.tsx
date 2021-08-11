import React from 'react';
import { useParams } from 'react-router-dom';

import { PageLayout } from '../components/PageLayout';
import { useFetchSinglePayment } from '../hooks/useFetchSinglePayment';
import { PaymentForm } from '../components/PaymentForm';
import { FetchStatus } from '../types';
import { Loader } from '../components/Loader';

export const EditBillPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchSinglePayment, payment, status } = useFetchSinglePayment();

  React.useEffect(() => {
    if (id) fetchSinglePayment(id);
  }, [id]);

  return (
    <PageLayout
      pageTitle="Wonderbill - Edit"
      headerTitle="Edit A Bill"
      pageWidth="sm"
    >
      {status === FetchStatus.PENDING && <Loader />}
      {status === FetchStatus.DONE && !payment && <p>No Bill Found!</p>}
      {status === FetchStatus.DONE && payment && (
        <>
          <section className="flex flex-col pb-2 mt-5 space-y-3 text-center">
            <h2 className="text-2xl text-wb-grey-dark">
              {payment?.name || 'Payment'}
            </h2>
            <h3 className="text-lg text-wb-grey">
              If you'd like to edit your bill you can change the details below
            </h3>
          </section>

          <PaymentForm editMode defaultPayment={payment} />
        </>
      )}
    </PageLayout>
  );
};
