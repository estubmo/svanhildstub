import { retrieveCart } from '@lib/data/cart';
import { retrieveCustomer } from '@lib/data/customer';
import CartTemplate from '@modules/cart/templates';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Cart - Svanhild Stub',
  description: 'View your cart',
};

export default async function Cart() {
  const cart = await retrieveCart();
  console.info('DEBUGPRINT[172]: page.tsx:13: cart=', cart);
  const customer = await retrieveCustomer();

  if (!cart) {
    return notFound();
  }

  return <CartTemplate cart={cart} customer={customer} />;
}
