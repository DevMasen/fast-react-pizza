import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
/////////////////////////////////
import store from '../../store';
import { fetchAddress, getUser, getUsername } from '../user/userSlice';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
//////////////////////////////////////////////////
import { createOrder } from '../../services/apiRestaurant';
import { formatCurrency } from '../../utils/helpers';
///////////////////////////////////////////////////////////
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
//////////////////////////////////////
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  const { status: AddressStatus, position, address, error: AddressError } = useSelector(getUser);

  const isAddressLoading = AddressStatus === 'loading';

  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalPrice = withPriority ? totalCartPrice + 0.2 * totalCartPrice : totalCartPrice;

  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-lg sm:basis-36">First Name</label>
          <input
            defaultValue={username}
            type="text"
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-lg sm:basis-36">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {errors?.phone && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-700 md:text-sm">
                {' '}
                {errors.phone}{' '}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-lg sm:basis-36" htmlFor="address">
            Address
          </label>
          <div className="grid grow grid-cols-[1fr_auto] gap-3">
            <input
              id="address"
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isAddressLoading}
            />
            {!position.latitude && !position.longitude && (
              <span className="flex basis-40 justify-end sm:basis-56">
                <Button
                  disabled={isAddressLoading}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  {isAddressLoading ? 'Loading...' : 'Get Position'}
                </Button>
              </span>
            )}
            {AddressStatus === 'error' && (
              <p className="col-span-2 rounded-md bg-red-100 p-3 text-xs text-red-700 md:text-sm">
                {AddressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={() => setWithPriority((cur) => !cur)}
            className="h-6 w-6 accent-yellow-400 ring-offset-2 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <label className="font-semibold" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting
              ? 'Placing your Order...'
              : `Order Now with ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please Enter your Phone Number so we can Contact you!';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
