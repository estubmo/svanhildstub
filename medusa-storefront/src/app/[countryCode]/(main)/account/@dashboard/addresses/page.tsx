import { getCustomer } from '@lib/data';
import AddressBook from '@modules/account/components/address-book';
import { getRegion } from 'app/actions';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Addresses - Svanhild Stub',
  description: 'View your addresses',
};

export default async function Addresses() {
  const nextHeaders = headers();
  const countryCode = nextHeaders.get('next-url')?.split('/')[1] || '';
  const customer = await getCustomer();
  const region = await getRegion(countryCode);

  if (!customer || !region) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Shipping Addresses</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  );
}
