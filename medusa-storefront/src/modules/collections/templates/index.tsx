'use client';

import { getProductsByCollectionHandle } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import { ProductCollection } from '@medusajs/medusa';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCart } from 'medusa-react';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CollectionTemplate: React.FC<{ collection: ProductCollection }> = ({
  collection,
}) => {
  const { cart } = useCart();
  const { ref, inView } = useInView();

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`get_collection_products`, collection.handle, cart?.id],
    ({ pageParam }) =>
      getProductsByCollectionHandle({
        pageParam,
        handle: collection.handle!,
        cartId: cart?.id,
        currencyCode: cart?.region.currency_code,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  useEffect(() => {
    if (cart?.region_id) {
      refetch();
    }
  }, [cart?.region_id, refetch]);

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <div className="content-container py-6">
      <div className="text-2xl-semi mb-8">
        <h1>{collection.title}</h1>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="text-small-regular flex items-center justify-center py-16 text-ui-fg-subtle"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  );
};

export default CollectionTemplate;
