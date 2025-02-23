import { PRODUCT_LIMIT } from '@lib/constants';
import { listProductsWithSort } from '@lib/data/products';
import { getRegion } from '@lib/data/regions';
import ProductPreview from '@modules/products/components/product-preview';
import { Pagination } from '@modules/store/components/pagination';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';

type PaginatedProductsParams = {
  limit: number;
  collection_id?: Array<string>;
  category_id?: Array<string>;
  id?: Array<string>;
  order?: string;
};

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryId?: string;
  productsIds?: Array<string>;
  countryCode: string;
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams['collection_id'] = [collectionId];
  }

  if (categoryId) {
    queryParams['category_id'] = [categoryId];
  }

  if (productsIds) {
    queryParams['id'] = productsIds;
  }

  if (sortBy === 'created_at') {
    queryParams['order'] = 'created_at';
  }

  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <>
      <ul
        className="grid w-full grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
