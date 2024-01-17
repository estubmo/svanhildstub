/* eslint-disable @typescript-eslint/no-explicit-any */
import { EllipseMiniSolid } from '@medusajs/icons';
import { clx, Label, RadioGroup, Text } from '@medusajs/ui';
import { ChangeEvent } from 'react';

type FilterRadioGroupProps = {
  title: string;
  items: Array<{
    value: string;
    label: string;
  }>;
  value: any;
  handleChange: (...args: Array<any>) => void;
};

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-x-3 gap-y-3">
      <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
      <RadioGroup>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx('flex items-center gap-x-2', {
              'ml-[-1.75rem]': i.value === value,
            })}
          >
            {i.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={i.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value,
                )
              }
              className="peer hidden"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                'txt-compact-small-plus text-ui-fg-subtle hover:cursor-pointer',
                {
                  'text-ui-fg-base': i.value === value,
                },
              )}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterRadioGroup;
