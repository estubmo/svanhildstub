
import AboutTemplate from '@modules/about';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Svanhild Stub',
  description: 'The story of Svanhild Stub is an interesting one. Learn more about her here.',
};

export default function AboutPage() {
  return (
    <AboutTemplate/>
  );
}
