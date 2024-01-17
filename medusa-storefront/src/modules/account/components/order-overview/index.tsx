'use client';

import { Order } from '@medusajs/medusa';
import { Button } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

import OrderCard from '../order-card';

const OrderOverview = ({ orders }: { orders: Array<Order> }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {':)'}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button>Continue shopping</Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderOverview;
