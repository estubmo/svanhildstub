'use client';

import { clx } from '@medusajs/ui';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export function MotionNav({ children }: { children?: JSX.Element }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const { countryCode } = useParams();
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  function update() {
    if (scrollY.get() < scrollY.getPrevious()) {
      setHidden(false);
    } else if (scrollY.get() > 100 && scrollY.get() > scrollY.getPrevious()) {
      setHidden(true);
    }
  }

  useMotionValueEvent(scrollY, 'change', () => update());

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  };

  return (
    <motion.nav
      className={clx(
        'text-small-regular txt-xsmall-plus flex h-full w-full items-center justify-between px-8 text-ui-fg-subtle',
        currentPath === ''
          ? ''
          : 'bg-gradient-to-b from-gray-900 to-transparent',
      )}
      variants={variants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.4 }}
    >
      {children}
    </motion.nav>
  );
}
