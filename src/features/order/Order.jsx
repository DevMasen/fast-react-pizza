// Test ID: IIDSAT
//////////////////
import { useLoaderData } from 'react-router';
///////////////////////////////////////////
import { getOrder } from '../../services/apiRestaurant';
///////////////////////////////////////////////////////
import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from '../../utils/helpers';
//////////////////////////////
function Order() {
	const order = useLoaderData();

	const {
		id,
		status,
		priority,
		priorityPrice,
		orderPrice,
		estimatedDelivery,
		cart,
	} = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div>
			<div>
				<h2>Status</h2>
				<h3>ID: {id}</h3>
				<div>
					{priority && <span>Priority</span>}
					<span> {status} order</span>
				</div>
			</div>

			<div>
				<p>
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: 'Order should have arrived'}
				</p>
				<p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<ul>
				{cart.map(item => (
					<li key={item.pizzaId}>{item.name}</li>
				))}
			</ul>

			<div>
				<p>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && (
					<p>Price priority: {formatCurrency(priorityPrice)}</p>
				)}
				<p>
					To pay on delivery:{' '}
					{formatCurrency(orderPrice + priorityPrice)}
				</p>
			</div>
		</div>
	);
}

export async function loader({ params }) {
	const order = await getOrder(params.orderId);
	return order;
}

export default Order;
