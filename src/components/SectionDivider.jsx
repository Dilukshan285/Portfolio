import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const SectionDivider = () => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="relative py-12 flex items-center justify-center overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="w-full h-px"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent-blue), var(--color-primary), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Central pulsing orb */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
        {/* Expanding rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={inView ? {
            scale: [1, 3, 5],
            opacity: [0.4, 0.15, 0],
          } : {}}
          transition={{
            duration: 2,
            delay: 0.8,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent-blue/20"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={inView ? {
            scale: [1, 2.5, 4],
            opacity: [0.3, 0.1, 0],
          } : {}}
          transition={{
            duration: 2,
            delay: 1.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};
