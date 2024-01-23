import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use - Svanhild Stub',
  description: 'Read our terms of use',
};

export default async function TermsOfUsePage() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl">Terms of Use</h1>

      <div className="space-y-2">
        <h2>1. Introduction</h2>
        <p>Placeholder</p>
      </div>
    </>
  );
}
