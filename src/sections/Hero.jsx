import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  Sparkles,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { MagneticButton } from "@/components/Reveal";
import { FloatingGeometry } from "@/components/FloatingGeometry";
import { useRef } from "react";

const skills = [
  "React.js", "Next.js", "Node.js", "Express.js", "Python", "PyTorch",
  "MongoDB", "MySQL", "Tailwind CSS", "Redux Toolkit", "FastAPI",
  "Spring Boot", "Firebase", "Git", "AWS", "YOLOv8", "GitHub Actions",
  "Jest", "Cypress",
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Dilukshan285", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/dilukshan-viyapury", label: "LinkedIn" },
  { icon: Mail, href: "mailto:dilukshanviyapury25@gmail.com", label: "Email" },
];

// Magnetic social button
const MagneticSocialButton = ({ social, idx }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="p-3 rounded-xl glass-divine hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 group"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + idx * 0.12 }}
    >
      <social.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.5)] transition-all" />
    </motion.a>
  );
};

// Letter by letter animation component
const AnimatedLetters = ({ text, className = "", delay = 0 }) => {
  return (
    <span className={className}>
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + idx * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Multi-layer Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        {/* Primary aurora */}
        <motion.div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{ background: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Accent aurora */}
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: "color-mix(in srgb, var(--color-accent) 8%, transparent)" }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blue aurora */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "color-mix(in srgb, var(--color-accent-blue) 6%, transparent)" }}
          animate={{
            scale: [1, 1.2, 0.85, 1],
            opacity: [0.5, 0.8, 0.4, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Pink accent */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: "color-mix(in srgb, var(--color-accent-pink) 5%, transparent)" }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Morphing blob */}
        <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-primary/5 morphing-blob blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,245,212,0.4) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,245,212,0.4) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* 3D Floating Geometry */}
      <FloatingGeometry />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-divine text-sm text-primary border border-primary/20">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                Full-Stack Developer & AI/ML Researcher
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4 sm:space-y-5">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AnimatedLetters text="Building" delay={0.3} />
                <span className="block text-gradient glow-text mt-1 sm:mt-2">
                  <TypeAnimation
                    sequence={[
                      "intelligent", 2500,
                      "production", 2500,
                      "innovative", 2500,
                      "scalable", 2500,
                    ]}
                    wrapper="span"
                    speed={40}
                    repeat={Infinity}
                    cursor={true}
                  />
                </span>
                <motion.span
                  className="block mt-1 sm:mt-2"
                  initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  systems with{" "}
                  <span className="font-serif italic font-normal text-gradient-cosmic">
                    precision.
                  </span>
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Hi, I'm{" "}
                <span className="text-foreground font-semibold">
                  Dilukshan Viyapury
                </span>{" "}
                — shipping production systems for international UK clients,
                conducting AI/ML research, and building full-stack applications
                across diverse tech stacks.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <MagneticButton>
                <a href="#contact">
                  <Button size="lg">
                    Contact Me <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={`${import.meta.env.BASE_URL}cv.html`} target="_blank" rel="noopener noreferrer">
                  <AnimatedBorderButton>
                    <Download className="w-5 h-5" />
                    Download CV
                  </AnimatedBorderButton>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <span className="text-sm text-muted-foreground font-mono">
                Find me →
              </span>
              {socialLinks.map((social, idx) => (
                <MagneticSocialButton key={idx} social={social} idx={idx} />
              ))}
            </motion.div>
          </div>

          {/* Right Column — Profile Card */}
          <motion.div
            className="relative z-20"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Rotating gradient ring */}
              <motion.div
                className="absolute -inset-4 rounded-[2rem] opacity-40"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, var(--color-primary), transparent, var(--color-accent), transparent, var(--color-accent-blue), transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* Second counter-rotating ring */}
              <motion.div
                className="absolute -inset-6 rounded-[2.5rem] opacity-20"
                style={{
                  background:
                    "conic-gradient(from 180deg, transparent, var(--color-accent-pink), transparent, var(--color-accent-blue), transparent)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -inset-3 rounded-[2rem] bg-background" />

              <div className="relative glass-divine rounded-[1.5rem] p-1.5 glow-border holographic">
                <img
                  src={`${import.meta.env.BASE_URL}dilu.png`}
                  alt="Dilukshan Viyapury"
                  className="w-full aspect-[4/5] object-cover rounded-[1.25rem]"
                />

                <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1/3 bg-gradient-to-t from-background/90 to-transparent rounded-b-[1.25rem]" />
              </div>

              {/* Floating Badge — Available */}
              <motion.div
                className="absolute -bottom-5 -right-5 glass-divine rounded-2xl px-5 py-3 border border-green-500/20 z-30"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm font-medium">
                    Available for work
                  </span>
                </div>
              </motion.div>

              {/* Stats Badge — 8+ Projects */}
              <motion.div
                className="absolute -top-5 -left-5 glass-divine rounded-2xl px-5 py-3 border border-primary/20 z-30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-2xl font-bold text-gradient font-display">8+</div>
                <div className="text-xs text-muted-foreground font-mono">Projects</div>
              </motion.div>

              {/* Orbiting decorative dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ["var(--color-primary)", "var(--color-accent)", "var(--color-accent-blue)", "var(--color-accent-pink)"][i],
                    top: "50%",
                    left: "50%",
                    boxShadow: `0 0 10px ${["rgba(0,245,212,0.5)", "rgba(123,47,247,0.5)", "rgba(0,180,216,0.5)", "rgba(255,45,135,0.5)"][i]}`,
                  }}
                  animate={{
                    x: [
                      Math.cos((i / 4) * Math.PI * 2) * 140,
                      Math.cos((i / 4) * Math.PI * 2 + Math.PI) * 140,
                      Math.cos((i / 4) * Math.PI * 2) * 140,
                    ],
                    y: [
                      Math.sin((i / 4) * Math.PI * 2) * 160,
                      Math.sin((i / 4) * Math.PI * 2 + Math.PI) * 160,
                      Math.sin((i / 4) * Math.PI * 2) * 160,
                    ],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Marquee */}
        <motion.div
          className="mt-16 sm:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <p className="text-xs text-muted-foreground mb-6 text-center uppercase tracking-[0.25em] font-mono">
            Technologies I Work With
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-6 sm:px-8 py-4">
                  <span className="text-base sm:text-lg font-medium text-muted-foreground/25 hover:text-primary transition-colors duration-500 cursor-default hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.4)]">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-mono">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
