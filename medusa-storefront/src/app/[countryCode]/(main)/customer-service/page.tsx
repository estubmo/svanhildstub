import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Service - Svanhild Stub',
  description: 'Have an issue? Get help by contacting or customer service.',
};
export default async function CustomerServicePage() {
  return (
    <div className="text-muted-foreground container mx-auto mt-10 flex max-h-full w-full flex-col gap-6 md:mt-20">
      <h1 className="text-2xl sm:text-4xl">Customer Service</h1>

      <div className="space-y-2">
        <h2>1. Introduction</h2>
        <p>Placeholder</p>
      </div>
    </div>
  );
}
