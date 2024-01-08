'use client';

import { clx } from '@medusajs/ui';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageWrapperVariants } from 'utils/variants';

interface IPageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({
  children,
  className,
}: IPageWrapperProps): JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageWrapperVariants}
      className={clx(
        className,
        'flex min-h-screen font-light content-container ',
      )}
    >
      {children}
    </motion.div>
  );
};
