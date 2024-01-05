import { Variants } from 'framer-motion';

export const pageWrapperVariants: Variants  = {
    hidden: {
        y: 0,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { staggerChildren: 0.2, duration: 0.5 }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

export const containerVariants: Variants  = {
    hidden: {
        y: '50px',
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { staggerChildren: 0.2, duration: 0.5 }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

export const childrenVariants: Variants  = {
    hidden: {
        y: '50px',
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

export const errorMessageVariant: Variants  = {
    hidden: {
        opacity: 0,
        y: -10
    },
    visible: {
        opacity: 1,
        y: 0
    }
};

export const parentVariants: Variants = {
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            delayChildren: 1,
            duration: 2
        }
    },
    hidden: {
        opacity: 0
    }
};

export const slideFromLeftVariants: Variants = {
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 2,
            delayChildren: 1.5
        }
    },
    offscreen: {
        opacity: 0,
        x: '-50%'
    }
};
export const slideFromRightVariants: Variants = {
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 2,
            delayChildren: 1.5
        }
    },
    offscreen: {
        opacity: 0,
        x: '50%'
    }
};

export const slideUpTextVariants: Variants = {
    onscreen: { opacity: 1, top: 0, transition: { duration: 1 } },
    offscreen: { opacity: 0, top: 16 }
};
