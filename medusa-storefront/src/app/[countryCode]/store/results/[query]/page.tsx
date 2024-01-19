import { search } from '@modules/search/actions';
import SearchResultsTemplate from '@modules/search/templates/search-results-template';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search - Svanhild Stub',
  description: 'Explore all of our products.',
};

type Params = {
  params: { query: string; countryCode: string };
  searchParams: {
    sortBy?: SortOptions;
    page?: string;
  };
};

export default async function SearchResults({ params, searchParams }: Params) {
  const { query } = params;
  const { sortBy, page } = searchParams;

  const hits = await search(query).then((data) => data);

  const ids = hits
    .map((h) => h.objectID || h.id)
    .filter((id): id is string => {
      return typeof id === 'string';
    });

  return (
    <SearchResultsTemplate
      query={query}
      ids={ids}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  );
}

export const dynamic = 'force-dynamic';
