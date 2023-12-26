import { RadioGroup } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useCheckout } from '@lib/context/checkout-context';
import { CheckCircleSolid, CreditCard } from '@medusajs/icons';
import { Button, clx, Container, Heading, Text, Tooltip } from '@medusajs/ui';
import Divider from '@modules/common/components/divider';
import Bancontact from '@modules/common/icons/bancontact';
import Ideal from '@modules/common/icons/ideal';
import Spinner from '@modules/common/icons/spinner';
import { useCart, useSetPaymentSession } from 'medusa-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import PaymentContainer from '../payment-container';
import PaymentStripe from '../payment-stripe';

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: JSX.Element }
> = {
  stripe: {
    title: 'Credit card',
    icon: <CreditCard />,
  },
  'stripe-ideal': {
    title: 'iDeal',
    icon: <Ideal />,
  },
  'stripe-bancontact': {
    title: 'Bancontact',
    icon: <Bancontact />,
  },
  manual: {
    title: 'Test payment',
    icon: <CreditCard />,
  },
  // Add more payment providers here
};

const Payment = () => {
  const {
    cart,
    editPayment: { state: isOpen, open, close },
    editAddresses: { state: addressesIsOpen, close: closeAddresses },
    editShipping: { state: shippingIsOpen, close: closeShipping },
    addressReady,
    shippingReady,
    paymentReady,
  } = useCheckout();

  const { setCart } = useCart();

  const [cardFormState, setCardFormState] = useState({
    cardNumberComplete: false,
    cardExpiryComplete: false,
    cardCvcComplete: false,
  });

  const { cardNumberComplete, cardExpiryComplete, cardCvcComplete } =
    cardFormState;

  const cardFormComplete =
    cardNumberComplete && cardExpiryComplete && cardCvcComplete;

  const {
    mutate: setPaymentSessionMutation,
    isLoading: settingPaymentSession,
  } = useSetPaymentSession(cart?.id || '');

  const handleEdit = () => {
    open();
    closeAddresses();
    closeShipping();
  };

  const editingOtherSteps = addressesIsOpen || shippingIsOpen;

  const handleSubmit = () => {
    close();
  };

  const handleChange = (value: string) => {
    setPaymentSession(value);
    clearErrors('paymentSession');
  };

  const useFormState = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    setError,
    formState: { errors },
    clearErrors,
  } = useFormState;

  const setPaymentSession = (providerId: string) => {
    if (cart) {
      setPaymentSessionMutation(
        {
          provider_id: providerId,
        },
        {
          onSuccess: ({ cart }) => {
            setCart(cart);
          },
          onError: () =>
            setError(
              'paymentSession',
              {
                type: 'validate',
                message:
                  'An error occurred while selecting this payment method. Please try again.',
              },
              { shouldFocus: true },
            ),
        },
      );
    }
  };

  return (
    <div className="bg-ui-bg-base px-4 small:px-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            'text-3xl-regular flex flex-row items-baseline gap-x-2',
            {
              'pointer-events-none select-none opacity-50':
                !isOpen && !paymentReady,
            },
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && addressReady && shippingReady && (
          <Text>
            <button onClick={handleEdit} className="text-ui-fg-interactive">
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        {cart?.payment_sessions?.length ? (
          <div className={!editingOtherSteps && isOpen ? 'block' : 'hidden'}>
            <RadioGroup
              value={cart.payment_session?.provider_id || ''}
              onChange={(value: string) => handleChange(value)}
            >
              {cart.payment_sessions
                .sort((a, b) => {
                  return a.provider_id > b.provider_id ? 1 : -1;
                })
                .map((paymentSession) => {
                  return (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentSession={paymentSession}
                      key={paymentSession.id}
                      selectedPaymentOptionId={
                        cart.payment_session?.provider_id || null
                      }
                    />
                  );
                })}
            </RadioGroup>
            <ErrorMessage
              errors={errors}
              name="paymentSession"
              render={({ message }) => {
                return (
                  <div className="text-small-regular pt-2 text-rose-500">
                    <span>{message}</span>
                  </div>
                );
              }}
            />
            {cart.payment_session?.provider_id === 'stripe' && (
              <div className="pt-8">
                <PaymentStripe
                  useFormState={useFormState}
                  setState={setCardFormState}
                  state={cardFormState}
                />
              </div>
            )}
            <Button
              onClick={handleSubmit}
              type="submit"
              size="large"
              className="mt-6"
              disabled={
                !cart.payment_session?.provider_id ||
                (cart.payment_session?.provider_id === 'stripe' &&
                  !cardFormComplete)
              }
              isLoading={settingPaymentSession}
            >
              Continue to review
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-ui-fg-base">
            <Spinner />
          </div>
        )}

        <div className={!editingOtherSteps && isOpen ? 'hidden' : 'block'}>
          {cart && cart.payment_session && (
            <div className="flex w-full items-start gap-x-1">
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                  Payment method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {paymentInfoMap[cart.payment_session.provider_id]?.title ||
                    cart.payment_session.provider_id}
                </Text>
                {process.env.NODE_ENV === 'development' &&
                  !Object.hasOwn(
                    paymentInfoMap,
                    cart.payment_session.provider_id,
                  ) && (
                    <Tooltip content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'" />
                  )}
              </div>
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                  Payment details
                </Text>
                <div className="txt-medium flex items-center gap-2 text-ui-fg-subtle">
                  <Container className="flex h-7 w-fit items-center bg-ui-button-neutral-hover p-2">
                    {paymentInfoMap[cart.payment_session.provider_id]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {cart.payment_session.provider_id === 'stripe'
                      ? '**** **** **** ****'
                      : 'Another step will appear'}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default Payment;
