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
import { useState, useEffect, useRef } from "react";

// ─── Cosmic Loading Screen ───
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  // Sacred geometry animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const animate = (time) => {
      const t = time * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Orbiting particles
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 + t * 0.5;
        const radius = 120 + Math.sin(t * 2 + i * 0.3) * 30;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const size = 1.5 + Math.sin(t * 3 + i) * 0.8;

        const colors = [
          [0, 245, 212],
          [123, 47, 247],
          [0, 180, 216],
          [255, 45, 135],
        ];
        const c = colors[i % 4];
        const opacity = 0.3 + Math.sin(t * 2 + i * 0.5) * 0.2;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
        grad.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacity})`);
        grad.addColorStop(1, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, size * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacity + 0.2})`;
        ctx.fill();
      }

      // Sacred geometry - rotating hexagons
      for (let ring = 0; ring < 3; ring++) {
        const ringRadius = 60 + ring * 35;
        const rotation = t * (0.3 + ring * 0.1) * (ring % 2 === 0 ? 1 : -1);
        const sides = 6;
        const opacity = 0.08 + ring * 0.02;

        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
          const angle = (i / sides) * Math.PI * 2 + rotation;
          const x = cx + Math.cos(angle) * ringRadius;
          const y = cy + Math.sin(angle) * ringRadius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 245, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "var(--color-background)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.6 }}
      />

      {/* Logo */}
      <motion.div
        className="relative mb-10 z-10"
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        {/* Spinning outer ring */}
        <motion.div
          className="w-32 h-32 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "var(--color-primary)",
            borderRightColor: "color-mix(in srgb, var(--color-accent) 50%, transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Counter-spinning inner ring */}
        <motion.div
          className="absolute inset-3 rounded-full"
          style={{
            border: "1px solid transparent",
            borderBottomColor: "color-mix(in srgb, var(--color-accent-blue) 50%, transparent)",
            borderLeftColor: "color-mix(in srgb, var(--color-accent-pink) 30%, transparent)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Pulsing core glow */}
        <motion.div
          className="absolute inset-5 rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 70%)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Logo text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold tracking-tight font-display">
            <span className="text-gradient">DV</span>
            <span className="text-accent">.</span>
          </span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="relative w-56 h-[3px] bg-border/20 rounded-full overflow-hidden z-10">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-blue), var(--color-accent))",
          }}
        />
      </div>

      {/* Percentage */}
      <motion.p
        className="text-xs font-mono text-muted-foreground mt-4 z-10 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Math.floor(progress)}%
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
