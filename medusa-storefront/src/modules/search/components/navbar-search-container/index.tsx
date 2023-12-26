import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client";
import { InstantSearch } from "react-instantsearch";

import { Transition } from "@headlessui/react";
import { MagnifyingGlassMini } from "@medusajs/icons";
import { clx } from "@medusajs/ui";
import { Fragment, useCallback, useState } from "react";
import DesktopHit from "../desktop-hit";
import DesktopHits from "../desktop-hits";
import SearchBox from "../search-box";

const NavbarSearchContainer = () => {
  const [isOpen, setOpen] = useState(false);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  return (
    <>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed bg-black/20 inset-0 z-10 backdrop-blur-sm animate-blur" />
      </Transition>
      <div className="flex flex-col h-fit">
        <div className="w-[25vw] z-50 flex h-[42px] items-center gap-x-2 px-4 py-2 bg-ui-bg-subtle border rounded-rounded focus-within:border-ui-border-interactive focus-within:bg-ui-bg-subtle-pressed ">
          <MagnifyingGlassMini className="text-ui-fg-muted" />
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <SearchBox onFocus={() => setOpen(true)} onBlur={handleBlur} />
            <div
              className={clx(
                "w-full justify-center  min-h-full absolute top-16 mt-2 left-0 right-0",
                isOpen ? "flex" : "hidden"
              )}
            >
              <DesktopHits hitComponent={DesktopHit} />
            </div>
          </InstantSearch>
        </div>
      </div>
    </>
  );
};

export default NavbarSearchContainer;
