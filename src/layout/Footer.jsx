import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Dilukshan285", label: "GitHub", hoverColor: "#e0e0e0" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/dilukshan-viyapury",
    label: "LinkedIn",
    hoverColor: "#0077b5",
  },
  {
    icon: Mail,
    href: "mailto:dilukshanviyapury25@gmail.com",
    label: "Email",
    hoverColor: "#00d4aa",
  },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border/30">
      {/* Animated wave top border */}
      <div className="absolute -top-px left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-[200%]"
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent-blue), var(--color-accent), var(--color-accent-pink), transparent, var(--color-primary), var(--color-accent-blue), var(--color-accent), var(--color-accent-pink), transparent)",
          }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#"
              className="text-xl font-bold tracking-tight inline-block"
            >
              <span className="text-gradient">DV</span>
              <span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              © {currentYear} Dilukshan Viyapury
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Social Links — with colored glow */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-xl glass hover:border-primary/30 transition-all duration-300"
                whileHover={{
                  scale: 1.15,
                  y: -3,
                  boxShadow: `0 0 20px ${social.hoverColor}40, 0 0 40px ${social.hoverColor}20`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/50 flex items-center justify-center gap-1">
            Crafted with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-accent-pink" />
            </motion.span>{" "}
            using React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full glass border border-primary/20 text-primary z-40 hover:bg-primary/10 transition-colors"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};
