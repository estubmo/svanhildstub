import { Text } from '@medusajs/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { ProductPreviewType } from 'types/global';

import Thumbnail from '../thumbnail';

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  isFeatured,
}: ProductPreviewType) => (
  <Link href={`/products/${handle}`} className="group">
    <div>
      <Thumbnail thumbnail={thumbnail} size="full" isFeatured={isFeatured} />
      <div className="txt-compact-medium mt-4 flex justify-between">
        <Text className="text-ui-fg-subtle">{title}</Text>
        <div className="flex items-center gap-x-2">
          {price ? (
            <>
              {price.price_type === 'sale' && (
                <Text className="text-ui-fg-muted line-through">
                  {price.original_price}
                </Text>
              )}
              <Text
                className={clsx('text-ui-fg-muted', {
                  'text-ui-fg-interactive': price.price_type === 'sale',
                })}
              >
                {price.calculated_price}
              </Text>
            </>
          ) : (
            <div className="h-6 w-20 animate-pulse bg-gray-200"></div>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default ProductPreview;
