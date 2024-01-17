import { LineItem, Region } from '@medusajs/medusa';
import { enrichLineItems, retrieveCart } from '@modules/cart/actions';

import CartDropdown from '../cart-dropdown';

const fetchCart = async () => {
  const cart = await retrieveCart();

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as Array<LineItem>;
  }

  return cart;
};

export default async function CartButton({
  regions,
}: {
  regions: Array<Region> | null;
}) {
  const cart = await fetchCart();

  return <CartDropdown cart={cart} regions={regions} />;
}
