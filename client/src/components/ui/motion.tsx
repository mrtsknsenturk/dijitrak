import * as React from "react";
import { motion, MotionProps } from "framer-motion";

type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

export const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  ...props
}) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export const FadeIn: React.FC<MotionDivProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInStagger: React.FC<
  MotionDivProps & { delay?: number; staggerChildren?: number }
> = ({ children, delay = 0, staggerChildren = 0.1, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem: React.FC<MotionDivProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FloatingAnimation: React.FC<
  MotionDivProps & { delay?: number }
> = ({ children, delay = 0, ...props }) => {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleOnHover: React.FC<MotionDivProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const RotateAnimation: React.FC<
  MotionDivProps & { duration?: number }
> = ({ children, duration = 30, ...props }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
