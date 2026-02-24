import { useDispatch, useSelector } from 'react-redux';
//////////////////////////////////////////
import { clearCart, getCart } from './cartSlice';
import { getUsername } from '../user/userSlice';
////////////////////////////////////////////////
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
//////////////////////////////////
function Cart() {
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-6 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y-2 divide-stone-300 border-b-2 border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-3">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={() => dispatch(clearCart())} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
