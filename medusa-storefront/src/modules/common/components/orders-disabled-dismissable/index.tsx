'use client';

import { InformationCircle, XMarkMini } from '@medusajs/icons';
import { IconButton } from '@medusajs/ui';
import { useState } from 'react';

export function OrdersDisabledDismissable() {
  const storedValue = window.sessionStorage.getItem('ordersDisabledSeen');

  const [ordersDisabledSeen, setOrdersDisabledSeen] = useState<boolean>(
    storedValue?.toLowerCase() == 'true',
  );

  const handleClick = () => {
    window.sessionStorage.setItem('ordersDisabledSeen', 'true');
    setOrdersDisabledSeen(true);
  };

  if (!process.env.NEXT_PUBLIC_DISABLE_ORDERS) return null;
  if (ordersDisabledSeen) return null;
  return (
    <div className="w-full md:max-w-md">
      <div className="flex items-start justify-between rounded-xl border border-amber-400 bg-amber-400/20 px-4 py-4">
        <div className="flex items-start gap-x-2">
          <div className="p-1.5 flex-shrink-0">
            <InformationCircle />
            </div>
          <div className="text-ui-fg-base py-1">
            <span className="font-bold">Info! </span>
            <span>Orders are currently disabled.</span>
          </div>
        </div>
        <IconButton className="flex-shrink-0" onClick={handleClick} variant="transparent">
          <XMarkMini />
        </IconButton>
      </div>
    </div>
  );
}
