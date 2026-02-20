import { Link } from 'react-router';
function CartOverview() {
	return (
		<div>
			<h1>Footer</h1>
			<p>
				<span>23 pizzas</span>
				<span>$23.45</span>
			</p>
			<Link to="/cart">Open cart &rarr;</Link>
		</div>
	);
}

export default CartOverview;
