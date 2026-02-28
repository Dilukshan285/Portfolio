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
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { MagneticButton } from "@/components/Reveal";

const skills = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Python",
  "PyTorch",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "Redux Toolkit",
  "FastAPI",
  "Spring Boot",
  "Firebase",
  "Git",
  "AWS",
  "YOLOv8",
  "GitHub Actions",
  "Jest",
  "Cypress",
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Dilukshan285",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/dilukshan-viyapury",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:dilukshanviyapury25@gmail.com",
    label: "Email",
  },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[120px] animate-aurora animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] animate-aurora animation-delay-600" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,170,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,212,170,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-primary border border-primary/20">
                <Sparkles className="w-4 h-4" />
                Full-Stack Developer & AI/ML Researcher
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-5">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">Building</span>
                <span className="block text-gradient">
                  <TypeAnimation
                    sequence={[
                      "intelligent",
                      2500,
                      "production",
                      2500,
                      "innovative",
                      2500,
                      "scalable",
                      2500,
                    ]}
                    wrapper="span"
                    speed={40}
                    repeat={Infinity}
                  />
                </span>
                <span className="block">
                  systems with{" "}
                  <span className="font-serif italic font-normal">
                    precision.
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton>
                <a href="#contact">
                  <Button size="lg">
                    Contact Me <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="/cv.html" target="_blank" rel="noopener noreferrer">
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
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="text-sm text-muted-foreground font-mono">
                Find me →
              </span>
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-xl glass hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Rotating gradient ring */}
              <motion.div
                className="absolute -inset-4 rounded-[2rem] opacity-50"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, var(--color-primary), transparent, var(--color-accent-blue), transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute -inset-3 rounded-[2rem] bg-background" />

              <div className="relative glass rounded-[1.5rem] p-1.5 glow-border">
                <img
                  src="/dilu.png"
                  alt="Dilukshan Viyapury"
                  className="w-full aspect-[4/5] object-cover rounded-[1.25rem]"
                />

                <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1/3 bg-gradient-to-t from-background/80 to-transparent rounded-b-[1.25rem]" />

                {/* Floating Badge - Available */}
                <motion.div
                  className="absolute -bottom-5 -right-5 glass rounded-2xl px-5 py-3 border border-green-500/20"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
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

                {/* Stats Badge */}
                <motion.div
                  className="absolute -top-5 -left-5 glass rounded-2xl px-5 py-3 border border-primary/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="text-2xl font-bold text-gradient">7+</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    Projects
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Marquee */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-xs text-muted-foreground mb-6 text-center uppercase tracking-[0.2em] font-mono">
            Technologies I Work With
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-lg font-medium text-muted-foreground/30 hover:text-primary transition-colors duration-500 cursor-default">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
