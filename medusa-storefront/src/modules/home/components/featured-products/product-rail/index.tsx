'use client';

import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import { ProductCollection } from '@medusajs/medusa';
import { Text } from '@medusajs/ui';
import InteractiveLink from '@modules/common/components/interactive-link';
import ProductPreview from '@modules/products/components/product-preview';

const ProductRail = ({ collection }: { collection: ProductCollection }) => {
  const { data } = useFeaturedProductsQuery(collection.id);

  return (
    <div className="small:py-12">
      <div className="content-container py-12">
        <div className="mb-8 flex justify-between">
          <Text className="txt-xlarge">{collection.title}</Text>
          <InteractiveLink href={`/store/collections/${collection.handle}`}>
            View all
          </InteractiveLink>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3">
          {data &&
            data.map((product) => (
              <li key={product.id}>
                <ProductPreview isFeatured {...product} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductRail;
