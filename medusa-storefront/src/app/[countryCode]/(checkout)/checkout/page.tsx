import { LineItem } from '@medusajs/medusa';
import { enrichLineItems, retrieveCart } from '@modules/cart/actions';
import Wrapper from '@modules/checkout/components/payment-wrapper';
import CheckoutForm from '@modules/checkout/templates/checkout-form';
import CheckoutSummary from '@modules/checkout/templates/checkout-summary';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Checkout - Svanhild Stub',
};

const fetchCart = async () => {
  const cart = await retrieveCart();

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as Array<LineItem>;
  }

  return cart;
};

export default async function Checkout() {
  const isOrdersDisabled = process.env.NEXT_PUBLIC_DISABLE_ORDERS === 'true';
  if (isOrdersDisabled) {
    redirect('/store/cart');
  }

  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) {
    return notFound();
  }

  const cart = await fetchCart();

  if (!cart) {
    return notFound();
  }

  return (
    <div className="content-container grid grid-cols-1 gap-x-40 py-12 small:grid-cols-[1fr_416px]">
      <Wrapper cart={cart}>
        <CheckoutForm />
      </Wrapper>
      <CheckoutSummary />
    </div>
  );
}
