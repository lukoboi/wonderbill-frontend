import { PageLayout } from '../components/PageLayout';
import { PaymentForm } from '../components/PaymentForm';

export const CreateBillPage = () => {
  return (
    <PageLayout
      pageTitle="Wonderbill - Create"
      headerTitle="Add a bill"
      pageWidth="sm"
    >
      <section className="flex flex-col pb-2 mt-5 space-y-3 text-center">
        <h2 className="text-2xl text-wb-grey-dark">Enter your details</h2>
        <h3 className="text-lg text-wb-grey">
          Keep track of your household spending by adding your bills
        </h3>
      </section>

      <PaymentForm />
    </PageLayout>
  );
};
