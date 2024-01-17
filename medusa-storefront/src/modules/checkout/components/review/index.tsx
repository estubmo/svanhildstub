'use client';

import { Cart } from '@medusajs/medusa';
import { clx, Heading, Text } from '@medusajs/ui';
import { useSearchParams } from 'next/navigation';

import PaymentButton from '../payment-button';

const Review = ({
  cart,
}: {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
}) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'review';

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    cart.payment_session;

  return (
    <div className="bg-ui-bg-base">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            'text-3xl-regular flex flex-row items-baseline gap-x-2',
            {
              'pointer-events-none select-none opacity-50': !isOpen,
            },
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} />
        </>
      )}
    </div>
  );
};

export default Review;
