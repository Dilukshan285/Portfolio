import { motion } from "framer-motion";

export const Button = ({
  className = "",
  size = "default",
  children,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300";

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    default: "px-7 py-3.5 text-base",
    lg: "px-9 py-4.5 text-lg",
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={{
        background: "linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 80%, var(--color-accent-blue)))",
        color: "var(--color-primary-foreground)",
        boxShadow: "0 0 20px color-mix(in srgb, var(--color-primary) 30%, transparent), 0 4px 15px color-mix(in srgb, var(--color-primary) 20%, transparent)",
      }}
      whileHover={{
        boxShadow: "0 0 30px color-mix(in srgb, var(--color-primary) 50%, transparent), 0 8px 30px color-mix(in srgb, var(--color-primary) 30%, transparent)",
        scale: 1.03,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Shimmer effect */}
      <span
        className="absolute inset-0 overflow-hidden rounded-full"
        aria-hidden
      >
        <span
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            animation: "shimmer 2.5s ease-in-out infinite",
          }}
        />
      </span>
      <span className="relative flex items-center justify-center gap-2 font-semibold">
        {children}
      </span>
    </motion.button>
  );
};
