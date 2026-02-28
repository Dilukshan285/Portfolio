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
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Dilukshan285", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dilukshan-viyapury-a26046328/", label: "LinkedIn" },
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
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
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
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
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
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Clean background — two subtle aurora blobs + grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background" />
          {/* Primary aurora — subtle */}
          <motion.div
            className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[180px]"
            style={{ background: "color-mix(in srgb, var(--color-primary) 8%, transparent)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Accent aurora */}
          <motion.div
            className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[180px]"
            style={{ background: "color-mix(in srgb, var(--color-accent) 6%, transparent)" }}
            animate={{ scale: [1, 0.9, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,245,212,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,245,212,0.3) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* 3D Floating Geometry — subtle R3F scene */}
        <FloatingGeometry />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-6 sm:pb-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center">
            {/* Left Column — Text */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
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
              <div className="space-y-3">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <AnimatedLetters text="Building" delay={0.3} />
                  <span className="block text-gradient glow-text mt-2">
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
                    className="block mt-2"
                    initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
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
                  className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed mt-3"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
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
                className="flex flex-wrap gap-4"
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
                className="flex items-center gap-4"
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

            {/* Right Column — Clean Profile Card */}
            <motion.div
              className="relative z-20 mt-2 sm:mt-0"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div className="relative max-w-xs sm:max-w-sm mx-auto">
                {/* Single subtle rotating gradient ring */}
                <motion.div
                  className="absolute -inset-3 rounded-[2rem] opacity-30"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 30%, var(--color-primary) 50%, transparent 70%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute -inset-2 rounded-[2rem] bg-background" />

                {/* Profile Image Card — clean glass */}
                <div className="relative glass-divine rounded-[1.5rem] p-1.5 border border-primary/10">
                  <img
                    src={`${import.meta.env.BASE_URL}dilu.png`}
                    alt="Dilukshan Viyapury"
                    className="w-full aspect-[3/4] object-cover object-top rounded-[1.25rem]"
                  />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1/3 bg-gradient-to-t from-background/80 to-transparent rounded-b-[1.25rem]" />
                </div>

                {/* Floating Badge — Available */}
                <motion.div
                  className="absolute -bottom-5 -right-5 glass-divine rounded-2xl px-4 py-2.5 border border-green-500/20 z-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </motion.div>

                {/* Stats Badge — 8+ Projects */}
                <motion.div
                  className="absolute -top-4 -left-4 glass-divine rounded-2xl px-4 py-2.5 border border-primary/15 z-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: "spring" }}
                >
                  <div className="text-xl font-bold text-gradient font-display">8+</div>
                  <div className="text-xs text-muted-foreground font-mono">Projects</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator with glow */}
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
            <span className="text-xs uppercase tracking-[0.2em] font-mono group-hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]">Scroll</span>
            <motion.div
              className="relative"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
              <div className="absolute inset-0 blur-[6px] bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* Tech Marquee — below hero viewport */}
      <motion.div
        className="py-8 sm:py-10 relative overflow-hidden bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-sm text-muted-foreground mb-6 text-center uppercase tracking-[0.25em] font-mono">
          Technologies I Work With
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...skills, ...skills].map((skill, idx) => (
              <div key={idx} className="flex-shrink-0 px-5 sm:px-7 py-3">
                <div className="flex items-center gap-2.5 group cursor-default">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-base sm:text-lg font-medium text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
