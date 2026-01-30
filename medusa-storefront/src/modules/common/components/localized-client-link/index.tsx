'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { forwardRef } from 'react';

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
} & Record<string, unknown>;

const LocalizedClientLink = forwardRef<HTMLAnchorElement, Props>(
  function LocalizedClientLink({ children, href, ...props }, ref) {
    const { countryCode } = useParams();

    let newHref = `/${countryCode}${href}`;

    if (newHref.includes('undefined/')) {
      newHref = newHref.replace('undefined/', '');
    }

    return (
      <Link ref={ref} href={newHref} {...props}>
        {children as React.ReactNode}
      </Link>
    );
  },
);

export default LocalizedClientLink;
