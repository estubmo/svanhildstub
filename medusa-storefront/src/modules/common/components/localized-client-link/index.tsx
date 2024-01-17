'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { ForwardedRef, forwardRef } from 'react';

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
type Props = {
  children?: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  passHref?: true;
  [x: string]: unknown;
};

function LocalizedClientLink(
  { children, href, ...props }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { countryCode } = useParams();

  return (
    <Link ref={ref} href={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  );
}

export default forwardRef(LocalizedClientLink);
