import { retrievePricedProductById } from '@lib/data';
import { getProductPrice } from '@lib/util/get-product-price';
import { Region } from '@medusajs/medusa';
import { Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { ProductPreviewType } from 'types/global';

import Thumbnail from '../thumbnail';
import PreviewPrice from './price';

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product);

  if (!pricedProduct) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  return (
    <LocalizedClientLink
      href={`/store/products/${productPreview.handle}`}
      className="group"
    >
      <div>
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="txt-compact-medium mt-4 flex justify-between">
          <Text className="text-ui-fg-subtle">{productPreview.title}</Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
}
