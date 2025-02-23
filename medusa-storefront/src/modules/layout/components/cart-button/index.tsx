import { retrieveCart } from '@lib/data/cart';
import { HttpTypes } from '@medusajs/types';

import CartDropdown from '../cart-dropdown';

export default async function CartButton({
  regions,
}: {
  regions: Array<HttpTypes.StoreRegion>;
}) {
  const cart = await retrieveCart().catch(() => null);

  return <CartDropdown regions={regions} cart={cart} />;
}
