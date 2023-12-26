import { useCheckout } from '@lib/context/checkout-context';
import { clx, Heading, Text } from '@medusajs/ui';

import PaymentButton from '../payment-button';

const Review = () => {
  const {
    cart,
    editPayment: { state: isEditPayment },
    editAddresses: { state: isEditAddresses },
    editShipping: { state: isEditShipping },
  } = useCheckout();

  const previousStepsCompleted =
    !!cart?.shipping_address &&
    !!cart.shipping_methods?.[0]?.shipping_option.id &&
    !!cart?.payment_sessions;

  const editingOtherSteps = isEditAddresses || isEditShipping || isEditPayment;

  return (
    <div className="bg-ui-bg-base px-4 small:px-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            'text-3xl-regular flex flex-row items-baseline gap-x-2',
            {
              'pointer-events-none select-none opacity-50': editingOtherSteps,
            },
          )}
        >
          Review
        </Heading>
      </div>
      {!editingOtherSteps && previousStepsCompleted && (
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
          <PaymentButton paymentSession={cart?.payment_session} />
        </>
      )}
    </div>
  );
};

export default Review;
