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
		<div className="layout">
			<Header />
			{isLoading && <Loader />}
			<hr />
			<main>
				<h1>Main</h1>
				<Outlet />
			</main>
			<hr />
			<CartOverview />
		</div>
	);
}

export default AppLayout;
