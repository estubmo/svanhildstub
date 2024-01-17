import InteractiveLink from '@modules/common/components/interactive-link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Svanhild Stub',
  description: 'Something went wrong',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <h1 className="text-2xl-semi text-ui-tag-neutral-text">Page not found</h1>
      <p className="text-small-regular text-ui-tag-neutral-text">
        The page you tried to access does not exist.
      </p>
      <InteractiveLink href="/">Go to frontpage</InteractiveLink>
    </div>
  );
}
