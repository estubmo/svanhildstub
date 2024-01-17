import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';
import { PageWrapper } from '@modules/page-wrapper';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </>
  );
}
