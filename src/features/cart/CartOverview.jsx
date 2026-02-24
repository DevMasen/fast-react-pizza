import { Link } from 'react-router';
import { useSelector } from 'react-redux';
/////////////////////////////////////
import { formatCurrency } from '../../utils/helpers';
//////////////////////////////////////////////////
function CartOverview() {
  const { cart } = useSelector((store) => store.cart);
  const numPizzas = cart.reduce((sum, item) => item.quantity + sum, 0);
  const totalPrice = cart.reduce((sum, item) => item.totalPrice + sum, 0);
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{numPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
