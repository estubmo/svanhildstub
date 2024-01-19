import { clx, Text } from '@medusajs/ui';

import { PriceType } from '../product-actions';

export default async function PreviewPrice({ price }: { price: PriceType }) {

  if (!price.price_type) return null;

  return (
    <>
      {price.price_type === 'sale' && (
        <Text className="text-ui-fg-muted line-through">
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx('text-ui-fg-muted', {
          'text-ui-fg-interactive': price.price_type === 'sale',
        })}
      >
        {price.calculated_price}
      </Text>
    </>
  );
}
