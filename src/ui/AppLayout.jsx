import { Outlet, useNavigation } from 'react-router';
/////////////////////////////////////////
import Header from './Header';
import Loader from './Loader';
///////////////////////////////
import CartOverview from '../features/cart/CartOverview';
///////////////////////////////////////////////////////
function AppLayout() {
  const navigate = useNavigation();
  const isLoading = navigate.state === 'loading';
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      {isLoading && <Loader />}
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
