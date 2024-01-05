import { getCollectionsList } from '@lib/data';
import Hero from '@modules/home/components/hero';
import BackgroundFader from '@modules/home/components/hero/background-fader';
import FrontpageFooter from '@modules/home/components/hero/frontpage-footer';
import MonochromeParallax from '@modules/home/components/hero/monochrome-parallax';
import MoroccoParallax from '@modules/home/components/hero/morocco-parallax';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Svanhild Stub',
  description:
    'Svanhild Stub is a Norwegian artist and painter. She is known for her unique abstract work.',
};

export default async function Home() {
  const { collections, count } = await getCollectionsList(0, 3);

  return (
    <div className="flex max-h-full w-full flex-col">
      <Hero
        wallpaperUrl="/assets/images/morocco/morocco_bg.webp"
        sigUrl="/assets/images/stub_sig.png"
        stampUrl="/assets/images/stamp.png"
      />
      <div className="h-screen"></div>
      <BackgroundFader colorFrom="#ECE4D4" colorTo="#A2A2A4">
        <MoroccoParallax />
        <MonochromeParallax />
        <FrontpageFooter />
      </BackgroundFader>
      {/* <Suspense fallback={<SkeletonHomepageProducts count={count} />}>
        <FeaturedProducts collections={collections} />
      </Suspense> */}
    </div>
  );
}
