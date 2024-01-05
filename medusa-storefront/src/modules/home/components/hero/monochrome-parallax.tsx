"use client";
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import {
    slideFromLeftVariants,
    slideFromRightVariants,
    slideUpTextVariants,
} from 'utils/variants';

import Parallax from './parallax';
import Scale from './scale';

const parentVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: 1,
      duration: 2,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const MonochromeParallax = () => {
  return (
    <motion.section
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      className="relative flex w-full flex-col justify-center overflow-hidden py-20 md:flex-row md:py-40"
    >
      {/* MOBILE */}
      <div className="relative flex w-full flex-col items-center gap-10 md:hidden">
        <Parallax offset={50}>
          <motion.div
            className="relative h-56 w-56 bg-gray-100 object-cover"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            style={{ y: 0, x: 0 }}
          >
            <Image
              alt="Monochrome First Photo"
              src="/assets/images/monochrome/monochrome_001.webp"
              fill
              className="object-cover"
            />
          </motion.div>
        </Parallax>
        <Parallax offset={50}>
          <motion.div
            className="relative h-56 w-56 bg-gray-100 object-cover"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            style={{ y: 0, x: 0 }}
          >
            <Image
              alt="Monochrome Second Photo"
              src="/assets/images/monochrome/monochrome_002.webp"
              fill
              className="object-cover"
            />
          </motion.div>
        </Parallax>
        <Parallax offset={50}>
          <motion.div
            className="relative h-56 w-56 bg-gray-100 object-cover"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            style={{ y: 0, x: 0 }}
          >

              <Image
              alt="Monochrome Third Photo"
              src="/assets/images/monochrome/monochrome_003.webp"
              fill
              className="object-cover"
            />
          </motion.div>
        </Parallax>
      </div>
      {/* DESKTOP */}
      <div className="max-w-screen-xl">
        <div className="relative hidden flex-row justify-center gap-10 md:flex lg:gap-20">
          <Parallax offset={50}>
            <motion.div
              className="relative h-56 w-56 bg-gray-100 object-cover"
              variants={parentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >


              <Image
              alt="Monochrome First Photo"
              src="/assets/images/monochrome/monochrome_001.webp"
              fill
              className="object-cover"
            />
            </motion.div>
          </Parallax>
          <motion.div
            className="relative h-56 w-56 bg-gray-100 object-cover"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >


           <Image
              alt="Monochrome Second Photo"
              src="/assets/images/monochrome/monochrome_002.webp"
              fill
              className="object-cover"
            />
          </motion.div>
          <Parallax offset={-50}>
            <motion.div
              className="relative h-56 w-56 bg-gray-100 object-cover"
              variants={parentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >


            <Image
              alt="Monochrome Third Photo"
              src="/assets/images/monochrome/monochrome_003.webp"
              fill
              className="object-cover"
            />
            </motion.div>
          </Parallax>
        </div>
        <div className="relative">
          <div className="flex w-full justify-center">
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              className="bg-[#CBC5BA] absolute bottom-96 z-20 mb-44 w-1/2 bg-opacity-80 p-2 md:bottom-1/2 md:right-10 md:mb-0 md:w-1/3"
            >
              <motion.h1
                variants={slideFromRightVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 'some' }}
                className="text-[#5B5752] relative w-full font-serif text-xl italic tracking-widest"
              >
                &quot;Color is my day-long obsession, joy and{' '}
                <motion.span
                  className="relative"
                  variants={slideUpTextVariants}
                >
                  torment
                </motion.span>
                &quot;
              </motion.h1>
              <motion.h1
                variants={slideFromLeftVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 'some' }}
                className="pl-4 text-right font-serif text-xl italic tracking-widest"
              >
                <strong>— Claude Monet</strong>
              </motion.h1>
            </motion.div>
          </div>
          <div className="mt-10 flex justify-center md:mt-20">
            <Scale scaleOffset={0.4}>
              <motion.div
                className="w-70v h-70v relative object-cover md:h-96 md:w-96"
                variants={parentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >



              <Image
              alt="Monochrome Full Photo"
              src="/assets/images/monochrome/monochrome_full.webp"
              fill
              className="object-cover"
            />
              </motion.div>
            </Scale>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MonochromeParallax;
