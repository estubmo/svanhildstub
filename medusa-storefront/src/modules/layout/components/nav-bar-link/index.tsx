import { clx } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { motion } from 'framer-motion';

type NavBarLinkProps = {
  route: {
    name: string;
    path: string;
  };
  active: boolean;
};

const hoverVariants = {
  rest: {
    width: 1,
    opacity: 0,
    transition: {
      duration: 0.3,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    width: '96%',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

const activePathVariants = {
  initial: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

const NavBarLink = ({ route, active }: NavBarLinkProps) => {
  return (
    <motion.div className="relative" whileHover="hover">
      <LocalizedClientLink href={route.path}>
        <div className="overflow-hidden focus:outline-none focus-visible:underline">
          <motion.div className="select-none text-base uppercase tracking-widest text-gray-50">
            {route.name}
          </motion.div>
          <motion.div
            className={clx(
              'absolute -bottom-[2px] h-[2px] rounded-xl bg-ui-bg-base will-change-transform',
            )}
            variants={!active ? hoverVariants : undefined}
          />

          {active && (
            <motion.div
              layoutId="navbarlink"
              variants={activePathVariants}
              initial="initial"
              className={clx(
                'absolute -bottom-[2px] h-[2px] rounded-xl bg-ui-bg-base',
              )}
              style={{
                width: '96%',
                originY: '0px',
              }}
            />
          )}
        </div>
      </LocalizedClientLink>
    </motion.div>
  );
};

export default NavBarLink;
