import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInUpWrapperProps = {
  children: ReactNode;
  delay?: number;
};

const FadeInUpWrapper = ({ children, delay = 0 }: FadeInUpWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUpWrapper;
