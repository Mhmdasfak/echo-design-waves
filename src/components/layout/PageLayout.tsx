
import React from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
  duration: 0.5,
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;
