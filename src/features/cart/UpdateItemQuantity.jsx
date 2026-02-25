import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId }) {
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const dispatch = useDispatch();
  return (
    <div className="space-x-2">
      <Button onClick={() => dispatch(decreaseItemQuantity(pizzaId))} type="round">
        -
      </Button>
      <span className="font-medium sm:text-sm">{currentQuantity}</span>
      <Button onClick={() => dispatch(increaseItemQuantity(pizzaId))} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
