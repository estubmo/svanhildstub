'use client';

import { Button, Heading } from '@medusajs/ui';
import DiscountCode from '@modules/checkout/components/discount-code';
import CartTotals from '@modules/common/components/cart-totals';
import Divider from '@modules/common/components/divider';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { CartWithCheckoutStep } from 'types/global';

type SummaryProps = {
  cart: CartWithCheckoutStep;
};

const Summary = ({ cart }: SummaryProps) => {
  const isOrdersDisabled = process.env.NEXT_PUBLIC_DISABLE_ORDERS === 'true';

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals data={cart} />
      <LocalizedClientLink href={`/checkout?step=${cart.checkout_step}`}>
        <Button className="h-10 w-full" disabled={isOrdersDisabled}>
          {isOrdersDisabled
            ? 'Orders are currently disabled'
            : 'Go to checkout'}
        </Button>
      </LocalizedClientLink>
    </div>
  );
};

export default Summary;
