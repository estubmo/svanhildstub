'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  parentVariants,
  slideFromLeftVariants,
  slideFromRightVariants,
  slideUpTextVariants,
} from 'utils/variants';

type Hero = {
  wallpaperUrl: string;
  sigUrl: string;
  stampUrl: string;
};

const Hero = ({ wallpaperUrl, sigUrl, stampUrl }: Hero) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  const { scrollY } = useScroll();

  const initial = elementTop;
  const final = (elementTop + elementHeight) / 2;
  const yRange = useTransform(scrollY, [initial, final], [1, 0]);
  const ySpring = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      setElementTop(
        element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset,
      );
      setElementHeight(element.clientHeight);
    }
  }, [scrollRef]);

  return (
    <div className="min-h-156 fixed flex h-screen max-h-screen w-full justify-center overflow-hidden">
      <motion.section
        ref={scrollRef}
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: ySpring }}
        className="relative z-10 flex h-full w-full max-w-sm flex-col items-center justify-center space-y-4 bg-black bg-opacity-20 text-center md:max-w-screen-sm md:space-y-10 xl:max-w-screen-lg"
      >
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some', root: scrollRef }}
          className="relative flex justify-center"
        >
          {stampUrl && (
            <Image
              src={stampUrl}
              className="select-none opacity-80 invert filter"
              alt="Stamp"
              width={200}
              height={200}
            />
          )}
        </motion.div>
        <motion.div
          variants={slideFromLeftVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 'some', root: scrollRef }}
          className="relative mb-10 flex justify-center"
        >
          {sigUrl && (
            <Image
              src={sigUrl}
              className="select-none opacity-80 invert filter"
              alt="Stub signature"
              width={200}
              height={100}
            />
          )}
        </motion.div>
        <motion.h1
          variants={slideFromRightVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 'some', root: scrollRef }}
          className="relative max-w-md px-8 font-serif text-xl italic tracking-widest md:text-xl"
        >
          &quot;Abstract art has helped us to experience the{' '}
          <motion.span
            className="relative text-xl md:text-2xl"
            variants={slideUpTextVariants}
          >
            emotional power
          </motion.span>{' '}
          inherent in pure form&quot;
        </motion.h1>
        <motion.h1
          variants={slideFromLeftVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 'some', root: scrollRef }}
          className="pl-4 font-serif text-xl italic tracking-widest md:text-xl"
        >
          <strong>— Anton Ehrenzweig</strong>
        </motion.h1>
      </motion.section>
      {wallpaperUrl && (
        <Image
          src={wallpaperUrl}
          priority
          className="select-none object-cover"
          alt="Background image"
          fill
        />
      )}
    </div>
  );
};

export default Hero;
