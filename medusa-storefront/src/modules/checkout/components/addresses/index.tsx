import { useCheckout } from '@lib/context/checkout-context';
import { CheckCircleSolid } from '@medusajs/icons';
import { Button, Heading, Text } from '@medusajs/ui';
import Divider from '@modules/common/components/divider';
import Spinner from '@modules/common/icons/spinner';

import BillingAddress from '../billing_address';
import ShippingAddress from '../shipping-address';

const Addresses = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isOpen, open },
    editShipping: { close: closeShipping },
    editPayment: { close: closePayment },
    setAddresses,
    handleSubmit,
    cart,
  } = useCheckout();

  const handleEdit = () => {
    open();
    closeShipping();
    closePayment();
  };

  return (
    <div className="bg-ui-bg-base px-4 small:px-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className="text-3xl-regular flex flex-row items-baseline gap-x-2"
        >
          Address
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && (
          <Text>
            <button onClick={handleEdit} className="text-ui-fg-interactive">
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <div className="pb-8">
          <ShippingAddress checked={checked} onChange={onChange} />

          {!checked && (
            <div>
              <Heading
                level="h2"
                className="text-3xl-regular gap-x-4 pb-6 pt-8"
              >
                Billing address
              </Heading>

              <BillingAddress />
            </div>
          )}

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit(setAddresses)}
          >
            Continue to delivery
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full items-start gap-x-1">
                  <div className="flex w-1/3 flex-col">
                    <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                      Shipping Address
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.first_name}{' '}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1}{' '}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code},{' '}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div className="flex w-1/3 flex-col ">
                    <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                      Contact
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </Text>
                  </div>

                  <div className="flex w-1/3 flex-col">
                    <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                      Billing Address
                    </Text>

                    {checked ? (
                      <Text className="txt-medium text-ui-fg-subtle">
                        Billing- and delivery address are the same.
                      </Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.first_name}{' '}
                          {cart.billing_address.last_name}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.address_1}{' '}
                          {cart.billing_address.address_2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.postal_code},{' '}
                          {cart.billing_address.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  );
};

export default Addresses;
