import { useFetcher } from 'react-router';
////////////////////////////////////////
import { updateOrder } from '../../services/apiRestaurant';
////////////////////////////////////////
import Button from '../../ui/Button';
/////////////////////////////////////
function UpdatePriority() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const updatedData = { priority: true };
  await updateOrder(params.orderId, updatedData);
  return null;
}

export default UpdatePriority;
// P2KOBN
