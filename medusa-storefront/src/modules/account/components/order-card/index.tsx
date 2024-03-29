import { formatAmount } from '@lib/util/prices';
import { Order } from '@medusajs/medusa';
import { Button } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Thumbnail from '@modules/products/components/thumbnail';
import { useMemo } from 'react';

type OrderCardProps = {
  order: Omit<Order, 'beforeInsert'>;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items.length;
  }, [order]);

  return (
    <div className="flex flex-col bg-ui-bg-base">
      <div className="text-large-semi mb-1 uppercase">#{order.display_id}</div>
      <div className="text-small-regular flex items-center divide-x divide-gray-200 text-ui-fg-base">
        <span className="pr-2">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? 'items' : 'item'
        }`}</span>
      </div>
      <div className="my-4 grid grid-cols-2 gap-4 small:grid-cols-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div key={i.id} className="flex flex-col gap-y-2">
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="text-small-regular flex items-center text-ui-fg-base">
                <span className="font-semibold text-ui-fg-base">{i.title}</span>
                <span className="ml-2">x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="text-small-regular text-ui-fg-base">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-ui-fg-base">more</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button variant="secondary">See details</Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderCard;
