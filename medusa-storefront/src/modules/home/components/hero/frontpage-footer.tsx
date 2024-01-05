"use client";
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const parentVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const FrontpageFooter = () => {
  return (
    <div className="min-h-156 relative flex flex-col h-screen max-h-screen w-full justify-center overflow-hidden">
      <motion.div
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="relative z-30 flex h-screen w-full flex-col items-center justify-center space-y-1 bg-black bg-opacity-20 text-center tracking-wider font-mono md:space-y-4"
      >
        <div>Svanhild Stub</div>
        <div>
          <a className="hover:underline" href="mailto:gallery@svanhildstub.com">
            gallery@svanhildstub.com
          </a>
        </div>
        <div>All paintings courtesy of the artist</div>
        <div>
          Site by{' '}
          <a className="hover:underline" href="https://www.mowebdev.com">
            Mo Web Dev
          </a>{' '}
          © {new Date().getFullYear()}
        </div>

      </motion.div>

      <Image
        src="/assets/images/monochrome/monochrome_bg.webp"
        alt="Background image"
        sizes="100vw"
        className="object-cover"
        fill
      />
    </div>
  );
};

export default FrontpageFooter;
