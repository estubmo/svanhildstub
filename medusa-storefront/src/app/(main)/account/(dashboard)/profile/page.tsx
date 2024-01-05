import ProfileTemplate from '@modules/account/templates/profile-template';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Svanhild Stub',
  description: 'View and edit your profile.',
};

export default function Profile() {
  return <ProfileTemplate />;
}
