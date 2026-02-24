import { useDispatch, useSelector } from 'react-redux';
//////////////////////////////////////////////////////
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
////////////////////////////////////////////////////
import { formatCurrency } from '../../utils/helpers';
///////////////////////////////////////////////////
import Button from '../../ui/Button';
import DeleteButton from '../../ui/DeleteButton';
///////////////////////////////////////
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-28 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex grow flex-col">
        <p className="mt-1 text-lg font-medium text-stone-800 md:text-xl">{name}</p>
        <p className="text-sm capitalize italic text-stone-500 sm:text-base">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-end justify-between font-medium">
          {!soldOut ? (
            <p className="text-sm md:text-base">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase tracking-wide text-stone-500 md:text-base">Sold out</p>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              add to cart
            </Button>
          )}

          {isInCart && <DeleteButton pizzaId={id} />}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
