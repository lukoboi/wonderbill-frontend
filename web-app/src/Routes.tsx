import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PaymentContextProvider } from './context/PaymentContext';

import { CreateBillPage } from './pages/CreateBillPage';
import { EditBillPage } from './pages/EditBillPage';
import { HomePage } from './pages/HomePage';

export const Routes = () => {
  return (
    <PaymentContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/create" exact component={CreateBillPage} />
          <Route path="/edit/:id" component={EditBillPage} />
        </Switch>
      </Router>
    </PaymentContextProvider>
  );
};
