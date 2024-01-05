import CartTemplate from '@modules/cart/templates';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart - Svanhild Stub',
  description: 'View your cart',
};

export default function Cart() {
  return <CartTemplate />;
}
