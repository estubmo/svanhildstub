import { OrdersDisabledDismissable } from '@modules/common/components/orders-disabled-dismissable';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { Suspense } from 'react';

import PaginatedProducts from './paginated-products';

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
}) => {
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <div className="content-container flex flex-grow flex-col py-6 small:flex-row small:items-start">
      <RefinementList sortBy={sortBy || 'created_at'} />
      <div className="w-full">
      <div className="flex w-full justify-center">
        <OrdersDisabledDismissable />
      </div>
        <div className="text-2xl-semi mb-8">
          <h1>All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || 'created_at'}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default StoreTemplate;
