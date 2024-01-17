/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {
  addShippingMethod,
  completeCart,
  deleteDiscount,
  setPaymentSession,
  updateCart,
} from '@lib/data';
import { GiftCard, StorePostCartsCartReq } from '@medusajs/medusa';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function cartUpdate(data: StorePostCartsCartReq) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) return 'No cartId cookie found';

  try {
    await updateCart(cartId, data);
    revalidateTag('cart');
  } catch (error: any) {
    return error.toString();
  }
}

export async function applyDiscount(code: string) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) return 'No cartId cookie found';

  await updateCart(cartId, { discounts: [{ code }] }).then(() => {
    revalidateTag('cart');
  });
}

export async function applyGiftCard(code: string) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) return 'No cartId cookie found';

  await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
    revalidateTag('cart');
  });
}

export async function removeDiscount(code: string) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) return 'No cartId cookie found';

  await deleteDiscount(cartId, code);
  revalidateTag('cart');
}

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: Array<GiftCard>,
) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) return 'No cartId cookie found';

  await updateCart(cartId, {
    gift_cards: [...giftCards]
      .filter((gc) => gc.code !== codeToRemove)
      .map((gc) => ({ code: gc.code })),
  }).then(() => {
    revalidateTag('cart');
  });
}

export async function submitDiscountForm(
  currentState: unknown,
  formData: FormData,
) {
  const code = formData.get('code') as string;

  try {
    await applyDiscount(code).catch(async () => {
      await applyGiftCard(code);
    });
    return null;
  } catch (error: any) {
    return error.toString();
  }
}

export async function setAddresses(currentState: unknown, formData: FormData) {
  if (!formData) return 'No form data received';

  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) return { message: 'No cartId cookie found' };

  const data = {
    shipping_address: {
      first_name: formData.get('shipping_address.first_name'),
      last_name: formData.get('shipping_address.last_name'),
      address_1: formData.get('shipping_address.address_1'),
      address_2: '',
      company: formData.get('shipping_address.company'),
      postal_code: formData.get('shipping_address.postal_code'),
      city: formData.get('shipping_address.city'),
      country_code: formData.get('shipping_address.country_code'),
      province: formData.get('shipping_address.province'),
      phone: formData.get('shipping_address.phone'),
    },
    email: formData.get('email'),
  } as StorePostCartsCartReq;

  const sameAsBilling = formData.get('same_as_billing');

  if (sameAsBilling === 'on') data.billing_address = data.shipping_address;

  if (sameAsBilling !== 'on')
    data.billing_address = {
      first_name: formData.get('billing_address.first_name'),
      last_name: formData.get('billing_address.last_name'),
      address_1: formData.get('billing_address.address_1'),
      address_2: '',
      company: formData.get('billing_address.company'),
      postal_code: formData.get('billing_address.postal_code'),
      city: formData.get('billing_address.city'),
      country_code: formData.get('billing_address.country_code'),
      province: formData.get('billing_address.province'),
      phone: formData.get('billing_address.phone'),
    } as StorePostCartsCartReq;

  try {
    await updateCart(cartId, data);
    revalidateTag('cart');
  } catch (error: any) {
    return error.toString();
  }

  redirect(
    `/${formData.get('shipping_address.country_code')}/checkout?step=delivery`,
  );
}

export async function setShippingMethod(shippingMethodId: string) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) throw new Error('No cartId cookie found');

  await addShippingMethod({ cartId, shippingMethodId });
  revalidateTag('cart');
}

export async function setPaymentMethod(providerId: string) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) throw new Error('No cartId cookie found');

  const cart = await setPaymentSession({ cartId, providerId });
  revalidateTag('cart');
  return cart;
}

export async function placeOrder() {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) throw new Error('No cartId cookie found');

  const cart = await completeCart(cartId);
  revalidateTag('cart');

  if (cart?.type === 'order') {
    const countryCode = cart.data.shipping_address?.country_code?.toLowerCase();
    cookies().set('_medusa_cart_id', '', { maxAge: -1 });
    redirect(`/${countryCode}/store/order/confirmed/${cart?.data.id}`);
  }

  return cart;
}
