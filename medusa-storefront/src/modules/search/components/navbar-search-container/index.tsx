'use client';

import { Transition } from '@headlessui/react';
import { SEARCH_INDEX_NAME, searchClient } from '@lib/search-client';
import { MagnifyingGlassMini } from '@medusajs/icons';
import { clx } from '@medusajs/ui';
import Hit from '@modules/search/components/hit';
import Hits from '@modules/search/components/hits';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import SearchBox from '../search-box';

const NavbarSearchContainer = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  if (pathname.split('/').length === 2) return null;
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
        <div className="animate-blur fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
      </Transition>
      <div className="flex h-fit flex-col">
        <div className="z-20 flex h-[42px] w-[20vw] items-center gap-x-2 rounded-rounded border bg-gray-950/60 px-4 py-2 focus-within:border-ui-border-interactive focus-within:bg-ui-bg-subtle-pressed hover:bg-ui-bg-field-hover">
          <MagnifyingGlassMini className="flex-shrink-0 text-ui-fg-muted" />
          <InstantSearchNext
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
            future={{
              preserveSharedStateOnUnmount: true,
            }}
          >
            <SearchBox onFocus={() => setOpen(true)} onBlur={handleBlur} />
            <div
              className={clx(
                'fixed left-0 right-0 top-16 mt-2 min-h-full w-full justify-center',
                isOpen ? 'flex' : 'hidden',
              )}
            >
              <Hits hitComponent={Hit} />
            </div>
          </InstantSearchNext>
        </div>
      </div>
    </>
  );
};

export default NavbarSearchContainer;
