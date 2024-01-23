import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy - Svanhild Stub',
  description: 'Read our return policy',
};

export default async function ReturnPolicyPage() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl">Return Policy</h1>

      <div className="space-y-2">
        <h2>1. Introduction</h2>
        <p>Placeholder</p>
      </div>
    </>
  );
}
