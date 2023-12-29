
import AboutTemplate from '@modules/about';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Svanhild Stub',
  description: 'The story about Svanhild Stub.',
};

export default function AboutPage() {
  return (
    <AboutTemplate/>
  );
}
