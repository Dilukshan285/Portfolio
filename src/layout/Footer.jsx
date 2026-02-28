import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, href: "https://github.com/Dilukshan285", label: "GitHub" },
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

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/30">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

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
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-xl glass hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
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
            Crafted with <Heart className="w-3 h-3 text-accent-pink" /> using
            React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};
