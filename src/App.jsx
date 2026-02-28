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
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="mb-8"
      >
        <span className="text-5xl font-bold tracking-tight">
          <span className="text-gradient">DV</span>
          <span className="text-primary">.</span>
        </span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-border/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full scroll-progress rounded-full"
          style={{ width: `${progress}%` }}
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
