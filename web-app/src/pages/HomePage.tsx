import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { PageLayout } from '../components/PageLayout';
import { PaymentsList } from '../components/PaymentsList';
import { useFetchPayments } from '../hooks/useFetchPayments';
import { FetchStatus } from '../types';

export const HomePage = () => {
  const history = useHistory();
  const { fetchAllPayments, allPayments, status } = useFetchPayments();

  React.useEffect(() => {
    fetchAllPayments();
  }, []);

  return (
    <PageLayout
      pageTitle="Wonderbill"
      headerTitle="Regular Payments"
      pageWidth="lg"
    >
      {status === FetchStatus.PENDING && <Loader />}
      {status === FetchStatus.DONE && (
        <>
          <PaymentsList payments={allPayments} />
          <div className="w-full max-w-sm">
            <Button onClick={() => history.push('/create')}>Add a bill</Button>
          </div>
        </>
      )}
    </PageLayout>
  );
};
