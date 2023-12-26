/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreGetProductsParams } from '@medusajs/medusa';

import CollectionFilter from './collection-filter';
import SortProducts, { SortOptions } from './sort-products';

type RefinementListProps = {
  refinementList: StoreGetProductsParams;
  setRefinementList: (refinementList: StoreGetProductsParams) => void;
  sortBy: SortOptions;
  setSortBy: (...args: any[]) => void;
  search?: boolean;
};

const RefinementList = ({
  refinementList,
  setRefinementList,
  sortBy,
  setSortBy,
  search = false,
}: RefinementListProps) => {
  return (
    <div className="mb-8 flex gap-12 px-8 py-4 small:ml-[1.675rem] small:min-w-[250px] small:flex-col small:pl-8 small:pr-0">
      <SortProducts sortBy={sortBy} setSortBy={setSortBy} />
      {!search && (
        <CollectionFilter
          refinementList={refinementList}
          setRefinementList={setRefinementList}
        />
      )}
    </div>
  );
};

export default RefinementList;
