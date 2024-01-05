import { Popover, Transition } from '@headlessui/react';
import { useCartDropdown } from '@lib/context/cart-dropdown-context';
import { useStore } from '@lib/context/store-context';
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import { ArrowRightMini } from '@medusajs/icons';
import { Button, clx, useToggleState } from '@medusajs/ui';
import LineItemOptions from '@modules/common/components/line-item-options';
import LineItemPrice from '@modules/common/components/line-item-price';
import Trash from '@modules/common/icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';
import { formatAmount, useCart } from 'medusa-react';
import Link from 'next/link';
import { Fragment } from 'react';

import CountrySelect from '../country-select';

const CartDropdown = () => {
  const { cart, totalItems } = useCart();
  const items = useEnrichedLineItems();
  const { deleteItem } = useStore();
  const { state, open, close } = useCartDropdown();
  const toggleState = useToggleState();

  return (
    <div>
      <Popover
        className="relative h-full"
        onMouseEnter={open}
        onMouseLeave={close}
      >
        <div className="overflow-visible">
          <Link
            href="/store/cart"
            className={clx(
              'flex items-center justify-center text-xl hover:text-white',
              state ? 'text-white' : 'text-gray-200 ',
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {totalItems > 0 && (
              <div className="absolute right-0 top-0 -mr-2 -mt-2 flex h-4 w-4 items-center justify-center rounded bg-blue-600 text-[11px] font-medium text-white">
                {totalItems <= 99 ? (
                  totalItems
                ) : (
                  <span className="text-[7px]">99+</span>
                )}
              </div>
            )}

            {/* {`Cart (${totalItems})`} */}
          </Link>
        </div>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel static className="absolute right-0 top-7 z-40 pt-5">
            <div className="hidden w-[382px] rounded-md border bg-ui-bg-base text-ui-fg-base small:block">
              <div className="flex items-center justify-center p-4">
                <h3 className="text-large-semi">Cart</h3>
              </div>
              {cart && items?.length ? (
                <>
                  <div className="no-scrollbar grid max-h-[402px] grid-cols-1 gap-y-8 overflow-y-scroll p-px px-4">
                    {items
                      .sort((a, b) => {
                        return a.created_at > b.created_at ? -1 : 1;
                      })
                      .map((item) => (
                        <div
                          className="grid grid-cols-[122px_1fr] gap-x-4"
                          key={item.id}
                        >
                          <Link
                            href={`/store/products/${item.variant.product.handle}`}
                            className="w-24"
                          >
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              size="square"
                            />
                          </Link>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-base-regular mr-4 w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    <Link
                                      href={`/store/products/${item.variant.product.handle}`}
                                    >
                                      {item.title}
                                    </Link>
                                  </h3>
                                  <></>
                                  <LineItemOptions variant={item.variant} />
                                  <span>Quantity: {item.quantity}</span>
                                </div>
                                <div className="flex justify-end">
                                  <LineItemPrice
                                    region={cart.region}
                                    item={item}
                                    style="tight"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="text-small-regular flex flex-1 items-end justify-between">
                              <div>
                                <button
                                  className="flex items-center gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <Trash size={14} />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="text-small-regular flex flex-col gap-y-4 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ui-fg-subtle">
                        Subtotal{' '}
                        <span className="font-normal">(excl. taxes)</span>
                      </span>
                      <span className="text-large-semi">
                        {formatAmount({
                          amount: cart.subtotal || 0,
                          region: cart.region,
                          includeTaxes: false,
                        })}
                      </span>
                    </div>
                    <Link href="/store/cart" passHref>
                      <Button className="w-full" size="large">
                        Go to cart
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div>
                  <div className="flex flex-col items-center justify-center gap-y-4 pb-16 pt-8">
                    <div className="text-ui-fg-subtle">
                      <svg
                        fill="currentColor"
                        height="126px"
                        width="126px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 231.523 231.523"
                      >
                        <g>
                          <g>
                            <path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523 c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215 C104.494,212.835,100.808,216.523,96.278,216.523z"></path>
                            <path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221 c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523 c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215 C181.937,212.835,178.251,216.523,173.719,216.523z"></path>
                            <path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046 c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z"></path>
                            <path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607 L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z"></path>
                            <path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606 c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607 C155.338,54.314,157.256,55.045,159.174,55.045z"></path>
                            <path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502 c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z"></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <span>Your shopping cart is empty.</span>
                    <div>
                      <Link href="/store">
                        <>
                          <span className="sr-only">
                            Go to all products page
                          </span>
                          <Button onClick={close}>Explore products</Button>
                        </>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              <div className="px-4 py-2">
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
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CartDropdown;
