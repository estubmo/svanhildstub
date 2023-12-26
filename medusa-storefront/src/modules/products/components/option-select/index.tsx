import { onlyUnique } from '@lib/util/only-unique';
import { ProductOption } from '@medusajs/medusa';
import clsx from 'clsx';
import React from 'react';

type OptionSelectProps = {
  option: ProductOption;
  current: string;
  updateOption: (option: Record<string, string>) => void;
  title: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique);

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div className="flex flex-wrap justify-between gap-2">
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clsx(
                'text-small-regular h-10 flex-1 rounded-rounded border border-ui-border-base bg-ui-bg-subtle p-2 ',
                {
                  'border-ui-border-interactive': v === current,
                  'transition-shadow duration-150 ease-in-out hover:shadow-elevation-card-rest':
                    v !== current,
                },
              )}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
