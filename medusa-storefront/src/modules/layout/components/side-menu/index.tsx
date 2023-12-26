import { Popover, Transition } from '@headlessui/react';
import { ArrowRightMini, XMark } from '@medusajs/icons';
import { clx, Text, useToggleState } from '@medusajs/ui';
import Link from 'next/link';
import { Fragment } from 'react';

import CountrySelect from '../country-select';

const SideMenuItems = {
  Home: '/',
  Store: '/store',
  Search: '',
  Account: '/account',
  Cart: '/cart',
};

const SideMenu = ({ searchModalOpen }: { searchModalOpen: () => void }) => {
  const handleSearchClick = (close: () => void) => {
    searchModalOpen();
    close();
  };

  const toggleState = useToggleState();

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Popover className="flex h-full">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative flex h-full items-center transition-all duration-200 ease-out hover:text-ui-fg-base focus:outline-none">
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="absolute inset-x-0 z-30 m-2 flex h-[calc(100vh-1rem)] w-1/3 flex-col text-sm text-ui-fg-on-color backdrop-blur-2xl 2xl:w-1/4">
                  <div className="flex h-full flex-col justify-between rounded-rounded bg-ui-bg-field p-6">
                    <div className="flex justify-end" id="xmark">
                      <button onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col items-start justify-start gap-6">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        if (
                          name === 'Search' &&
                          process.env.FEATURE_SEARCH_ENABLED
                        ) {
                          return (
                            <li key={name}>
                              <button
                                className="text-3xl leading-10 underline-offset-8 hover:underline"
                                onClick={() => handleSearchClick(close)}
                              >
                                {name}
                              </button>
                            </li>
                          );
                        }
                        return (
                          <li key={name}>
                            <Link
                              href={href}
                              className="text-3xl leading-10 underline-offset-8 hover:underline"
                              onClick={close}
                            >
                              {name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex items-center justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        <CountrySelect toggleState={toggleState} />
                        <ArrowRightMini
                          className={clx(
                            'transition-transform duration-150',
                            toggleState.state ? '-rotate-90' : '',
                          )}
                        />
                      </div>
                      <Text className="txt-compact-small flex justify-between">
                        © {new Date().getFullYear()} Mo Web Dev. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default SideMenu;
