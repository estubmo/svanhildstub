'use client';

import { LineItem, Region } from '@medusajs/medusa';
import { clx, Table, Text } from '@medusajs/ui';
import { updateLineItem } from '@modules/cart/actions';
import CartItemSelect from '@modules/cart/components/cart-item-select';
import ErrorMessage from '@modules/checkout/components/error-message';
import DeleteButton from '@modules/common/components/delete-button';
import LineItemOptions from '@modules/common/components/line-item-options';
import LineItemPrice from '@modules/common/components/line-item-price';
import LineItemUnitPrice from '@modules/common/components/line-item-unit-price';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Spinner from '@modules/common/icons/spinner';
import Thumbnail from '@modules/products/components/thumbnail';
import { useState } from 'react';

type ItemProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
  type?: 'full' | 'preview';
};

const Item = ({ item, region, type = 'full' }: ItemProps) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handle } = item.variant.product;

  const changeQuantity = async (quantity: number) => {
    setError(null);
    setUpdating(true);

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        return err.message;
      })
      .finally(() => {
        setUpdating(false);
      });

    message && setError(message);
  };

  return (
    <Table.Row className="w-full">
      <Table.Cell className="w-24 p-4 !pl-0">
        <LocalizedClientLink
          href={`/store/products/${handle}`}
          className={clx('flex', {
            'w-16': type === 'preview',
            'w-12 small:w-24': type === 'full',
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text className="txt-medium-plus text-ui-fg-base">{item.title}</Text>
        <LineItemOptions variant={item.variant} />
      </Table.Cell>

      {type === 'full' && (
        <Table.Cell>
          <div className="flex w-28 items-center gap-2">
            <DeleteButton id={item.id} />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="h-10 w-14 p-4"
            >
              {Array.from(
                {
                  length: Math.min(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10,
                    10,
                  ),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                ),
              )}
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} />
        </Table.Cell>
      )}

      {type === 'full' && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice item={item} region={region} style="tight" />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx('!pr-0', {
            'flex h-full flex-col items-end justify-center': type === 'preview',
          })}
        >
          {type === 'preview' && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
