import { Dialog, Transition } from '@headlessui/react';
import useToggleState from '@lib/hooks/use-toggle-state';
import { getProductPrice } from '@lib/util/get-product-price';
import { Region } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { Button, clx } from '@medusajs/ui';
import ChevronDown from '@modules/common/icons/chevron-down';
import X from '@modules/common/icons/x';
import React, { Fragment, useMemo } from 'react';

import OptionSelect from '../option-select';

type MobileActionsProps = {
  product: PricedProduct;
  variant?: PricedVariant;
  region: Region;
  options: Record<string, string>;
  updateOptions: (update: Record<string, string>) => void;
  inStock?: boolean;
  handleAddToCart: () => void;
  isAdding?: boolean;
  show: boolean;
};

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  region,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
}) => {
  const { state, open, close } = useToggleState();
  const isOnlyOneVariant = product.variants.length === 1;
  const isOrdersDisabled = process.env.NEXT_PUBLIC_DISABLE_ORDERS === 'true';

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
    region,
  });

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null;
    }
    const { variantPrice, cheapestPrice } = price;

    return variantPrice || cheapestPrice || null;
  }, [price]);

  return (
    <>
      <div
        className={clx('fixed inset-x-0 bottom-0 lg:hidden', {
          'pointer-events-none': !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="text-large-regular flex h-full w-full flex-col items-center justify-center gap-y-3 border-t border-gray-200 bg-ui-bg-base p-4">
            <div className="flex items-center gap-x-2">
              <span>{product.title}</span>
              {selectedPrice?.price_type && <span>—</span>}
              {selectedPrice?.price_type ? (
                <div className="flex items-end gap-x-2 text-ui-fg-base">
                  {selectedPrice.price_type === 'sale' && (
                    <p>
                      <span className="text-small-regular line-through">
                        {selectedPrice.original_price}
                      </span>
                    </p>
                  )}
                  {selectedPrice.price_type && (
                    <span
                      className={clx({
                        'text-ui-fg-interactive':
                          selectedPrice.price_type === 'sale',
                      })}
                    >
                      {selectedPrice.calculated_price}
                    </span>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="grid w-full grid-cols-2 gap-x-4">
              <Button
                onClick={open}
                variant="secondary"
                className={clx('w-full', isOnlyOneVariant && 'hidden')}
              >
                <div className="flex w-full items-center justify-between">
                  <span>
                    {variant
                      ? Object.values(options).join(' / ')
                      : 'Select Options'}
                  </span>
                  <ChevronDown />
                </div>
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={
                  !inStock ||
                  !variant ||
                  !price.cheapestPrice?.price_type ||
                  isOrdersDisabled
                }
                className={clx('w-full', isOnlyOneVariant && 'col-span-2')}
                isLoading={isAdding}
              >
                {!price.cheapestPrice?.price_type
                  ? 'Not currently for sale'
                  : isOrdersDisabled
                    ? 'Orders are currently disabled'
                    : !variant
                      ? 'Select variant'
                      : !inStock
                        ? 'Sold'
                        : 'Add to cart'}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0">
            <div className="flex h-full min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="flex h-full w-full transform flex-col gap-y-3 overflow-hidden text-left">
                  <div className="flex w-full justify-end pr-6">
                    <button
                      onClick={close}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-ui-bg-base text-ui-fg-base"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="bg-ui-bg-base px-6 py-12">
                    {product.variants.length > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileActions;
