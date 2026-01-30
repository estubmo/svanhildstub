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
  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container flex flex-col py-6 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <Suspense fallback={<div className="mb-8 flex gap-12 py-4 pl-6 small:ml-[1.675rem] small:min-w-[250px] small:flex-col small:px-0" />}>
        <RefinementList sortBy={sort} />
      </Suspense>
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default StoreTemplate;
