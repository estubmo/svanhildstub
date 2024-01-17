import { ProductCollection } from '@medusajs/medusa';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';
import { Suspense } from 'react';

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions;
  collection: ProductCollection;
  page?: string;
  countryCode: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <div className="content-container flex flex-col py-6 small:flex-row small:items-start">
      <RefinementList sortBy={sortBy || 'created_at'} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1>{collection.title}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || 'created_at'}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}
