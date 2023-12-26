import { useMobileMenu } from "@lib/context/mobile-menu-context";
import { ProductHit } from "@modules/search/components/hit";
import React from "react";
import { useHits, UseHitsProps, useSearchBox } from "react-instantsearch";
import ShowAll from "../show-all";

type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

const MobileHits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { hits } = useHits(props);
  const { query } = useSearchBox();
  const { close } = useMobileMenu();

  // If the query is empty, we don't want to show the initial hits
  if (!!query === false || !hits.length) {
    return null;
  }

  return (
    <div className={className}>
      <span className="text-small-regular uppercase text-ui-fg-subtle">
        Results
      </span>
      <div className="flex flex-col gap-6 py-4">
        {hits.map((hit, index) => (
          <li key={index} className="list-none">
            <Hit hit={hit as unknown as ProductHit} />
          </li>
        ))}
      </div>
      <ShowAll close={close} />
    </div>
  );
};

export default MobileHits;
