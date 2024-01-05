import { useMobileMenu } from '@lib/context/mobile-menu-context';
import { SEARCH_INDEX_NAME, searchClient } from '@lib/search-client';
import { MagnifyingGlassMini } from '@medusajs/icons';
import MobileHit from '@modules/search/components/mobile-hit';
import MobileHits from '@modules/search/components/mobile-hits';
import SearchBox from '@modules/search/components/search-box';
import { InstantSearchNext } from 'react-instantsearch-nextjs';


const SearchMenu = () => {
  const {
    screen: [_, setScreen],
    close,
  } = useMobileMenu();

  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={SEARCH_INDEX_NAME}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex-1 basis-0">
            <div className="flex items-center gap-x-2">
              <MagnifyingGlassMini />
              <SearchBox close={close} shouldFocus />
            </div>
          </div>
          <div className="ml-4 flex justify-end">
            <button
              onClick={() => setScreen('main')}
              className="text-small-semi uppercase text-ui-fg-base"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="px-8 py-4">
          <MobileHits hitComponent={MobileHit} />
        </div>
      </div>
    </InstantSearchNext>
  );
};

export default SearchMenu;
