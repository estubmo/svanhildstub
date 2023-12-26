import clsx from 'clsx';
import React from 'react';
import { useHits, UseHitsProps, useSearchBox } from 'react-instantsearch';

import { ProductHit } from '../hit';
import ShowAll from '../show-all';

type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

const DesktopHits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox();
  const { hits } = useHits(props);

  return (
    <div
      className={clsx(
        'mb-1 w-[50vw] p-px transition-[height,max-height,opacity] duration-300 ease-in-out',
        className,
        {
          'max-h-full opacity-100': !!query,
          'max-h-0 opacity-0': !query && !hits.length,
        },
      )}
    >
      <div className="mb-4 grid grid-cols-3 gap-4">
        {hits.slice(0, 6).map((hit, index) => (
          <li key={index} className="list-none">
            <Hit hit={hit as unknown as ProductHit} />
          </li>
        ))}
      </div>
      <ShowAll close={close} />
    </div>
  );
};

export default DesktopHits;
