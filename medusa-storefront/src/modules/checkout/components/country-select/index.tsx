import { HttpTypes } from '@medusajs/types';
import NativeSelect, {
  NativeSelectProps,
} from '@modules/common/components/native-select';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion;
  }
>(({ placeholder = 'Country', region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current,
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }));
  }, [region]);

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    >
      {countryOptions?.map(({ value, label }) => (
        <option
          key={value}
          value={value}
          className="bg-ui-bg-field hover:bg-ui-bg-field-hover"
        >
          {label}
        </option>
      ))}
    </NativeSelect>
  );
});

CountrySelect.displayName = 'CountrySelect';

export default CountrySelect;
