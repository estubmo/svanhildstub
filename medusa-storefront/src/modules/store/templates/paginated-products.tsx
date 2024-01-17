import { PRODUCT_LIMIT } from '@lib/constants';
import { getProductsListWithSort } from '@lib/data';
import ProductPreview from '@modules/products/components/product-preview';
import { Pagination } from '@modules/store/components/pagination';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { getRegion } from 'app/actions';

type PaginatedProductsParams = {
  limit: number;
  collection_id?: Array<string>;
  category_id?: Array<string>;
  id?: Array<string>;
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
  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

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

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <>
      <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview productPreview={p} region={region} />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  );
}
