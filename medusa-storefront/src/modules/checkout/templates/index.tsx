import { CheckoutProvider } from '@lib/context/checkout-context';
import ChevronDown from '@modules/common/icons/chevron-down';
import MedusaCTA from '@modules/layout/components/medusa-cta';
import Link from 'next/link';

import CheckoutLoader from '../components/checkout-loader';
import SubmitSpinner from '../components/submit-spinner';
import CheckoutForm from './checkout-form';
import CheckoutSummary from './checkout-summary';

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="relative bg-ui-bg-base small:min-h-screen">
        <SubmitSpinner />
        <div className="h-16 bg-ui-bg-base">
          <nav className="content-container flex h-full items-center justify-between border-b">
            <Link
              href="/store/cart"
              className="text-small-semi flex flex-1 basis-0 items-center gap-x-2 uppercase text-ui-fg-subtle"
            >
              <>
                <ChevronDown className="rotate-90" size={16} />
                <span className="txt-compact-plus mt-px hidden uppercase text-ui-fg-subtle hover:text-ui-fg-base small:block">
                  Back to shopping cart
                </span>
                <span className="mt-px block small:hidden">Back</span>
              </>
            </Link>
            <Link
              href="/"
              className="txt-compact-xlarge-plus uppercase text-ui-fg-subtle hover:text-ui-fg-base"
            >
              Svanhild Stub
            </Link>
            <div className="flex-1 basis-0" />
          </nav>
        </div>
        <div className="relative">
          <CheckoutLoader />
          <div className="content-container grid grid-cols-1 gap-x-40 py-12 small:grid-cols-[1fr_416px]">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
        <div className="flex w-full items-center justify-center py-4">
          <MedusaCTA />
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutTemplate;
