import LandingNav from '@modules/layout/templates/landing-nav';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNav />
      {children}
    </>
  );
}
