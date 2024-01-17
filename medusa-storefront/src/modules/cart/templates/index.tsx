import { Customer } from '@medusajs/medusa';
import Divider from '@modules/common/components/divider';
import { CartWithCheckoutStep } from 'types/global';

import EmptyCartMessage from '../components/empty-cart-message';
import SignInPrompt from '../components/sign-in-prompt';
import ItemsTemplate from './items';
import Summary from './summary';

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: CartWithCheckoutStep | null;
  customer: Omit<Customer, 'password_hash'> | null;
}) => {
  return (
    <div className="py-12">
      <div className="content-container">
        {cart?.items.length ? (
          <div className="grid grid-cols-1 gap-x-40 small:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-y-6 bg-ui-bg-base p-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate region={cart?.region} items={cart?.items} />
            </div>
            <div className="relative">
              <div className="sticky top-12 flex flex-col gap-y-8">
                {cart?.region && (
                  <>
                    <div className="bg-ui-bg-base p-6">
                      <Summary cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTemplate;
