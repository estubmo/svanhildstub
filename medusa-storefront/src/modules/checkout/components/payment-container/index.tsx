import { RadioGroup } from '@headlessui/react';
import { InformationCircleSolid } from '@medusajs/icons';
import { PaymentSession } from '@medusajs/medusa';
import { clx, Text, Tooltip } from '@medusajs/ui';
import Radio from '@modules/common/components/radio';
import React from 'react';

import PaymentTest from '../payment-test';

type PaymentContainerProps = {
  paymentSession: PaymentSession;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <>
      <RadioGroup.Option
        key={paymentSession.id}
        value={paymentSession.provider_id}
        disabled={disabled}
        className={clx(
          'text-small-regular mb-2 flex cursor-pointer flex-col gap-y-2 rounded-rounded border px-8 py-4 hover:shadow-borders-interactive-with-active',
          {
            'border-ui-border-interactive':
              selectedPaymentOptionId === paymentSession.provider_id,
          },
        )}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-x-4">
            <Radio
              checked={selectedPaymentOptionId === paymentSession.provider_id}
            />
            <Text className="text-base-regular">
              {paymentInfoMap[paymentSession.provider_id]?.title ||
                paymentSession.provider_id}
            </Text>
            {process.env.NODE_ENV === 'development' &&
              !Object.hasOwn(paymentInfoMap, paymentSession.provider_id) && (
                <Tooltip
                  content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'"
                  className="min-w-fit"
                >
                  <InformationCircleSolid color="var(--fg-muted)" />
                </Tooltip>
              )}

            {paymentSession.provider_id === 'manual' && isDevelopment && (
              <PaymentTest className="hidden small:block" />
            )}
          </div>
          <span className="justify-self-end text-ui-fg-base">
            {paymentInfoMap[paymentSession.provider_id]?.icon}
          </span>
        </div>
        {paymentSession.provider_id === 'manual' && isDevelopment && (
          <PaymentTest className="text-[10px] small:hidden" />
        )}
      </RadioGroup.Option>
    </>
  );
};

export default PaymentContainer;
