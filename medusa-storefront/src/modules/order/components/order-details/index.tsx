import { Order } from '@medusajs/medusa';
import { Text } from '@medusajs/ui';

type OrderDetailsProps = {
  order: Order;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const _items = order.items.reduce((acc, i) => acc + i.quantity, 0);

  const formatStatus = (str: string) => {
    const formatted = str.split('_').join(' ');

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  return (
    <div>
      <Text className="mt-8">
        We have sent the order confirmation details to{' '}
        <span className="text-ui-fg-medium-plus font-semibold">
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        Order date: {new Date(order.created_at).toDateString()}
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        Order number: {order.display_id}
      </Text>

      <div className="text-compact-small mt-4 flex items-center gap-x-4">
        {showStatus && (
          <>
            <Text>
              Order status:{' '}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Payment status:{' '}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
