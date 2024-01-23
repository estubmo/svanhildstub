import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Sale - Svanhild Stub',
  description: 'Read our terms of sale',
};

export default async function TermsOfSalePage() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl">Terms of Sale</h1>

      <div className="space-y-2">
        <h2>1. Introduction</h2>
        <p>Placeholder</p>
      </div>
    </>
  );
}
