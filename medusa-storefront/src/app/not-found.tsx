import Footer from '@modules/layout/templates/footer';
import LandingNav from '@modules/layout/templates/landing-nav';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Svanhild Stub',
  description: 'Something went wrong',
};

export default function NotFound() {
  return (
    <>
      <LandingNav />

    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <h1 className="text-2xl-semi text-ui-tag-neutral-text">Page not found</h1>
      <p className="text-small-regular text-ui-tag-neutral-text">
        The page you tried to access does not exist.
      </p>
      <Link
        href="/"
        className="text-base-regular mt-4 text-ui-fg-interactive underline"
      >
        Go to frontpage
      </Link>
    </div>
    <Footer/>
    </>
  );
}
