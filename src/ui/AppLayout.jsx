import { Outlet } from 'react-router';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

function AppLayout() {
	return (
		<div>
			<Header />

			<main>
				<Outlet />
			</main>

			<CartOverview />
		</div>
	);
}

export default AppLayout;
