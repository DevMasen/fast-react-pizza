import DeleteButton from '../../ui/DeleteButton';
import { formatCurrency } from '../../utils/helpers';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="items-center py-3 sm:flex sm:justify-between">
      <p className="mb-1 sm:mb-0 md:text-lg">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
