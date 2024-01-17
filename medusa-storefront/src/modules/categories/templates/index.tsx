import InteractiveLink from '@modules/common/components/interactive-link';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductCategoryWithChildren } from 'types/global';

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: Array<ProductCategoryWithChildren>;
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;

  const category = categories[categories.length - 1];
  const parents = categories.slice(0, categories.length - 1);

  if (!category || !countryCode) notFound();

  return (
    <div className="content-container flex flex-col py-6 small:flex-row small:items-start">
      <RefinementList sortBy={sortBy || 'created_at'} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8 flex flex-row gap-4">
          {parents?.map((parent) => (
            <span key={parent.id} className="text-ui-fg-subtle">
              <LocalizedClientLink
                className="mr-4 hover:text-black"
                href={`/store/categories/${parent.handle}`}
              >
                {parent.name}
              </LocalizedClientLink>
              /
            </span>
          ))}
          <h1>{category.name}</h1>
        </div>
        {category.description && (
          <div className="text-base-regular mb-8">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="text-base-large mb-8">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/store/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || 'created_at'}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}
