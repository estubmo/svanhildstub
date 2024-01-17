import { getCustomer } from '@lib/data';
import { getCheckoutStep } from '@lib/util/get-checkout-step';
import { LineItem } from '@medusajs/medusa';
import { enrichLineItems, retrieveCart } from '@modules/cart/actions';
import CartTemplate from '@modules/cart/templates';
import { Metadata } from 'next';
import { CartWithCheckoutStep } from 'types/global';

export const metadata: Metadata = {
  title: 'Cart - Svanhild Stub',
  description: 'View your cart',
};

const fetchCart = async () => {
  const cart = await retrieveCart().then(
    (cart) => cart as CartWithCheckoutStep,
  );

  if (!cart) {
    return null;
  }

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as Array<LineItem>;
  }

  cart.checkout_step = cart && getCheckoutStep(cart);

  return cart;
};

export default async function Cart() {
  const cart = await fetchCart();
  const customer = await getCustomer();

  return <CartTemplate cart={cart} customer={customer} />;
}
