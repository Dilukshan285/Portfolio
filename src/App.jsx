import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { ParticleField } from "@/components/ParticleField";
import { SectionDivider } from "@/components/SectionDivider";
import { CustomCursor } from "@/components/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Loading screen component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Animated ring + logo */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        {/* Spinning ring */}
        <motion.div
          className="w-28 h-28 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "var(--color-primary)",
            borderRightColor: "color-mix(in srgb, var(--color-accent-blue) 50%, transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Pulsing inner glow */}
        <motion.div
          className="absolute inset-3 rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 70%)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Logo text — solid color, centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold tracking-tight">
            <span className="text-primary">DV</span>
            <span className="text-accent-blue">.</span>
          </span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-border/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-blue))",
          }}
        />
      </div>

      {/* Percentage */}
      <motion.p
        className="text-xs font-mono text-muted-foreground mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {progress}%
      </motion.p>
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Global particle background */}
      <ParticleField />

      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
