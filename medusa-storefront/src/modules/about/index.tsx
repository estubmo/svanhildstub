'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { childrenVariants, containerVariants } from 'utils/variants';

export default function AboutTemplate() {
  return (
    <div className="h-full w-full max-w-screen-xl justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="mt-24 flex w-full flex-col p-4"
      >
        <motion.h1
          className="text-4xl font-bold tracking-wider"
          variants={childrenVariants}
        >
          About Svanhild Stub
        </motion.h1>
        <motion.h2
          className="font-light italic tracking-widest text-gray-200"
          variants={childrenVariants}
        >
          Why abstract art is more than just emotion
        </motion.h2>

        <div className="clear-none mt-4 font-extralight leading-6 tracking-wider">
          <motion.div
            variants={childrenVariants}
            className="relative float-right mx-4 h-80 w-72"
          >
            <Image
              fill
              src="/assets/images/svanhild.jpg"
              className="object-cover"
              alt="portrait"
              quality={50}
            />
          </motion.div>
          <motion.div
            className="mt-4 font-extralight leading-6 tracking-wider"
            variants={childrenVariants}
          >
            Norwegian artist Svanhild Stub lives through her art. Hailing from
            the rugged island of Frøya in northern Norway, where nature is raw
            and unforgiving, finding beauty wherever it presents itself comes
            naturally to her. This is reflected in her art.
          </motion.div>
          <motion.div
            className="mt-4 font-extralight leading-6 tracking-wider"
            variants={childrenVariants}
          >
            Currently a resident of Andalusia, Spain, there is no lack of
            inspiration in the scenery. Svanhild regularly puts on paper
            anything that resonates with her, be it abstract or concrete.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
