import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Svanhild Stub',
  description:
    'Need to contact someone invovled in this project? This is how you can reach us.',
};

export default async function ContactPage() {
  return (
    <div className="-mt-16 flex max-h-full w-full flex-col">
      Contact Placeholder
    </div>
  );
}
