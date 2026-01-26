import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import StoreTemplate from '@modules/store/templates';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store - Svanhild Stub',
  description: 'Explore all of our products.',
};

type Params = Promise<{ countryCode: string }>;
type SearchParams = Promise<{
  sortBy?: SortOptions;
  page?: string;
}>;

export default async function StorePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams;

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  );
}
