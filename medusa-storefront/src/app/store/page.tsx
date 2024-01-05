import StoreTemplate from '@modules/store/templates';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store - Svanhild Stub',
  description: 'Explore all of our products.',
};

export default function StorePage() {
  return <StoreTemplate />;
}
