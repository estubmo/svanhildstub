'use client';

import { updateRegion } from '@lib/data/cart';
import { ArrowRightMini } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { clx } from '@medusajs/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

type CountrySelectProps = {
  regions: Array<HttpTypes.StoreRegion>;
};

const CountrySelect = ({ regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined);
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);

  const { countryCode } = useParams();
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  const options: Array<CountryOption> | undefined = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }));
      })
      .flat()
      .sort((a, b) => (a?.label ?? '').localeCompare(b?.label ?? ''));
  }, [regions]);

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o.country === countryCode);
      setCurrent(option);
    }
  }, [options, countryCode]);

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath);
    setIsCountrySelectOpen(false);
  };

  return (
    <DropdownMenu.Root
      open={isCountrySelectOpen}
      onOpenChange={setIsCountrySelectOpen}
    >
      <DropdownMenu.Trigger className="flex w-full cursor-pointer items-center justify-between">
        <div className="txt-compact-small flex w-full items-start gap-x-2">
          <span>Shipping to:</span>
          {current && (
            <span className="txt-compact-small flex items-center gap-x-2">
              <ReactCountryFlag
                svg
                style={{
                  width: '16px',
                  height: '16px',
                }}
                countryCode={current.country}
              />
              {current.label}
            </span>
          )}
        </div>
        <ArrowRightMini
          className={clx(
            'justify-end transition-transform duration-150',
            isCountrySelectOpen && 'rotate-90',
          )}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="ease-[cubic-bezier(0.16,1,0.3,1)] z-40 mt-2 w-[240px] rounded-md border bg-gray-950/60 px-2 py-2 text-ui-fg-base backdrop-blur-2xl data-[state=closed]:animate-[dropdown-menu-content-hide_300ms] data-[state=open]:animate-[dropdown-menu-content-show_300ms]"
          align="end"
        >
          {options?.map((o) => {
            return (
              <DropdownMenu.Item
                key={o.country}
                className="flex w-full cursor-pointer items-center gap-x-2 rounded px-3 py-2 hover:bg-gray-100/40"
                onClick={() => {
                  handleChange(o);
                  setIsCountrySelectOpen(false);
                }}
              >
                <ReactCountryFlag
                  svg
                  style={{
                    width: '16px',
                    height: '16px',
                  }}
                  countryCode={o.country}
                />{' '}
                {o.label}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CountrySelect;
