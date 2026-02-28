import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const SectionDivider = () => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="relative py-16 flex items-center justify-center overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="w-full h-px"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-accent), var(--color-primary), var(--color-accent-blue), var(--color-accent-pink), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Sacred geometry center element */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
      >
        {/* Inner spinning sacred geometry */}
        <motion.div
          className="w-8 h-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {/* Diamond shape using CSS */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
          <div
            className="absolute inset-1"
            style={{
              background: "var(--color-background)",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
          </div>
        </motion.div>

        {/* Expanding rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={inView ? {
            scale: [1, 4, 7],
            opacity: [0.4, 0.1, 0],
          } : {}}
          transition={{
            duration: 2.5,
            delay: 0.8,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/20"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={inView ? {
            scale: [1, 3, 6],
            opacity: [0.3, 0.08, 0],
          } : {}}
          transition={{
            duration: 2.5,
            delay: 1.2,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent-pink/15"
          initial={{ scale: 1, opacity: 0.2 }}
          animate={inView ? {
            scale: [1, 2.5, 5],
            opacity: [0.2, 0.05, 0],
          } : {}}
          transition={{
            duration: 2.5,
            delay: 1.6,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
      </motion.div>
    </div>
  );
};
