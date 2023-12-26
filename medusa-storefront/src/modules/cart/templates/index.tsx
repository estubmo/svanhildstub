'use client';

import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import Divider from '@modules/common/components/divider';
import SkeletonCartPage from '@modules/skeletons/templates/skeleton-cart-page';
import { useCart, useMeCustomer } from 'medusa-react';

import EmptyCartMessage from '../components/empty-cart-message';
import SignInPrompt from '../components/sign-in-prompt';
import ItemsTemplate from './items';
import Summary from './summary';

const CartTemplate = () => {
  const { cart } = useCart();
  const { customer, isLoading } = useMeCustomer();
  const items = useEnrichedLineItems();

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />;
  }

  return (
    <div className="py-12">
      <div className="content-container">
        {cart.items.length ? (
          <div className="grid grid-cols-1 gap-x-40 small:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-y-6 bg-ui-bg-base p-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}

              <ItemsTemplate region={cart?.region} items={items} />
            </div>
            <div className="relative">
              <div className="sticky top-12 flex flex-col gap-y-8">
                {cart && cart.region && (
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
