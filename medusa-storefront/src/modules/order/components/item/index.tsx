import { LineItem, Region } from '@medusajs/medusa';
import { Table, Text } from '@medusajs/ui';
import LineItemOptions from '@modules/common/components/line-item-options';
import LineItemPrice from '@modules/common/components/line-item-price';
import LineItemUnitPrice from '@modules/common/components/line-item-unit-price';
import Thumbnail from '@modules/products/components/thumbnail';

type ItemProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  return (
    <Table.Row className="w-full">
      <Table.Cell className="w-24 p-4 !pl-0">
        <div className="flex w-16">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text className="txt-medium-plus text-ui-fg-base">{item.title}</Text>
        <LineItemOptions variant={item.variant} />
      </Table.Cell>

      <Table.Cell className="!pr-0">
        <span className="flex h-full flex-col items-end justify-center !pr-0">
          <span className="flex gap-x-1 ">
            <Text className="text-ui-fg-muted">{item.quantity}x </Text>
            <LineItemUnitPrice item={item} region={region} style="tight" />
          </span>

          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
