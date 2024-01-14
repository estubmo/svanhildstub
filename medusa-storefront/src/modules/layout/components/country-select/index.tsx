'use client';

import { Listbox, Transition } from '@headlessui/react';
import { useStore } from '@lib/context/store-context';
import { StateType } from '@lib/hooks/use-toggle-state';
import { revalidateTags } from 'app/actions';
import { useRegions } from 'medusa-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

type CountrySelectProps = {
  toggleState: StateType;
};

const CountrySelect = ({ toggleState }: CountrySelectProps) => {
  const { countryCode, setRegion } = useStore();
  const { regions } = useRegions();
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined);

  const { state, close } = toggleState;

  const options: CountryOption[] | undefined = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }));
      })
      .flat();
  }, [regions]);

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o.country === countryCode);
      setCurrent(option);
    }
  }, [countryCode, options]);

  const handleChange = (option: CountryOption) => {
    revalidateTags(['medusa_request', 'products', 'collections']);
    setRegion(option.region, option.country);
    close();
  };

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o.country === countryCode)
            : undefined
        }
      >
        <Listbox.Button className="w-full py-1">
          <div className="txt-compact-small flex items-start gap-x-2">
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
        </Listbox.Button>
        <div className="relative flex w-full">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="text-small-regular no-scrollbar absolute -bottom-[calc(100%-36px)] left-0 z-[900] max-h-[442px] w-full overflow-y-scroll rounded-rounded bg-ui-bg-base uppercase text-ui-fg-base drop-shadow-md xsmall:left-auto xsmall:right-0"
              static
            >
              {options?.map((o, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={o}
                    className="flex cursor-pointer items-center gap-x-2 px-3 py-2 hover:bg-ui-bg-field-hover"
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
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CountrySelect;
