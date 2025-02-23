'use client';

import { clx, Heading, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { useSearchParams } from 'next/navigation';

import PaymentButton from '../payment-button';

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'review';

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

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
                read, understand and accept our{' '}
                <LocalizedClientLink
                  href="/content/terms-of-use"
                  className="underline"
                >
                  Terms of Use
                </LocalizedClientLink>
                ,{' '}
                <LocalizedClientLink
                  href="/content/terms-of-sale"
                  className="underline"
                >
                  Terms of Sale
                </LocalizedClientLink>{' '}
                and{' '}
                <LocalizedClientLink
                  href="/content/return-policy"
                  className="underline"
                >
                  Returns Policy
                </LocalizedClientLink>{' '}
                and acknowledge that you have read the Svanhild Stub
                Store&apos;s{' '}
                <LocalizedClientLink
                  href="/content/privacy-policy"
                  className="underline"
                >
                  Privacy Policy
                </LocalizedClientLink>{' '}
                .
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  );
};

export default Review;
