import { getProductsList } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import { StoreGetProductsParams } from '@medusajs/medusa';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCart } from 'medusa-react';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export type InfiniteProductsType = {
  params: StoreGetProductsParams;
  sortBy?: SortOptions;
};

const InfiniteProducts = ({ params, sortBy }: InfiniteProductsType) => {
  const { cart } = useCart();

  const { ref, inView } = useInView();

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {};

    if (cart?.id) {
      p.cart_id = cart.id;
    }

    if (cart?.region?.currency_code) {
      p.currency_code = cart.region.currency_code;
    }

    p.is_giftcard = false;

    return {
      ...p,
      ...params,
    };
  }, [cart?.id, cart?.region, params]);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => getProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    );

  const previews = usePreviews({
    pages: data?.pages,
    region: cart?.region,
    sortBy,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <div className="content-container flex-1">
      <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-3">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
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

export default InfiniteProducts;
