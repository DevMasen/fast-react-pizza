import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
function MenuItem({ pizza }) {
  // const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
          <Button type="small">add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
