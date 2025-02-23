import Hero from '@modules/home/components/hero';
import BackgroundFader from '@modules/home/components/hero/background-fader';
import FrontpageFooter from '@modules/home/components/hero/frontpage-footer';
import MonochromeParallax from '@modules/home/components/hero/monochrome-parallax';
import MoroccoParallax from '@modules/home/components/hero/morocco-parallax';

export default async function Home() {
  return (
    <div className="-mt-16 flex max-h-full w-full flex-col">
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
