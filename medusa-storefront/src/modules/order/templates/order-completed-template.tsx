'use client';

import { Order } from '@medusajs/medusa';
import { Heading } from '@medusajs/ui';
import CartTotals from '@modules/common/components/cart-totals';
import Help from '@modules/order/components/help';
import Items from '@modules/order/components/items';
import OnboardingCta from '@modules/order/components/onboarding-cta';
import OrderDetails from '@modules/order/components/order-details';
import ShippingDetails from '@modules/order/components/shipping-details';
import React, { useEffect, useState } from 'react';

import PaymentDetails from '../components/payment-details';

type OrderCompletedTemplateProps = {
  order: Order;
};

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem('onboarding');
    setIsOnboarding(onboarding === 'true');
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] py-6">
      <div className="content-container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div className="flex h-full w-full max-w-4xl flex-col gap-4 bg-ui-bg-base p-10">
          <Heading
            level="h1"
            className="flex flex-col gap-y-2 text-3xl text-ui-fg-base"
          >
            <span>Thank you!</span>
            <span>Your order was placed successfully.</span>
          </Heading>
          <OrderDetails order={order} />
          <Heading level="h2" className="text-3xl-regular flex flex-row">
            Summary
          </Heading>
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <CartTotals data={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  );
};

export default OrderCompletedTemplate;
