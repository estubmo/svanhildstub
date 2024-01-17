'use client';

import { XMark } from '@medusajs/icons';
import { Region } from '@medusajs/medusa';
import { clx, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import CountrySelect from '../country-select';

const SideMenuItems = {
  Home: '/',
  Search: '/store/search',
  Store: '/store',
  About: '/about',
  Account: '/account',
  Cart: '/store/cart',
};

const SideMenu = ({ regions }: { regions: Array<Region> | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger className="relative flex h-full items-center text-gray-200 transition-colors duration-200 ease-out hover:text-white focus:outline-none">
            <div className="relative h-10 w-10 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2  -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className={clx(
                    'absolute block h-0.5 w-5 -translate-y-1.5 rounded-sm bg-current ',
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={clx(
                    'absolute block  h-0.5 w-5 transform rounded-sm bg-current',
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={clx(
                    'absolute block  h-0.5 w-5 translate-y-1.5 rounded-sm bg-current',
                  )}
                ></span>
              </div>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content className="2xl:w-1/ fixed inset-x-0 top-0 z-40 m-2 flex h-[calc(100vh-1rem)] w-full flex-col rounded-[6px] pr-4 text-sm text-ui-fg-on-color backdrop-blur-2xl focus:outline-none data-[state=closed]:animate-[content-hide_300ms] data-[state=open]:animate-[content-show_300ms] sm:w-1/3 sm:min-w-min sm:pr-0">
              <div className="flex h-full flex-col justify-between rounded-rounded bg-[rgba(3,7,18,0.5)] p-6">
                <div className="flex justify-end" id="xmark">
                  <button onClick={() => setIsOpen(false)}>
                    <XMark />
                  </button>
                </div>
                <ul className="flex flex-col items-start justify-start gap-6">
                  {Object.entries(SideMenuItems).map(([name, href]) => {
                    return (
                      <li key={name}>
                        <LocalizedClientLink
                          href={href}
                          className="text-3xl leading-10 hover:text-ui-fg-disabled"
                          onClick={() => setIsOpen(false)}
                        >
                          {name}
                        </LocalizedClientLink>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col gap-y-6">
                  <div className="flex items-center justify-between">
                    {regions && <CountrySelect regions={regions} />}
                  </div>
                  <Text className="txt-compact-small flex justify-between">
                    © {new Date().getFullYear()} Mo Web Dev. All rights
                    reserved.
                  </Text>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default SideMenu;
