import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const controls = useAnimation();

  // Entry animation — fire once
  useEffect(() => {
    controls.start({ y: 0, transition: { duration: 0.6, ease: "easeOut" } });
  }, [controls]);

  // Scroll detection + progress + active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? window.scrollY / totalHeight : 0);

      // Active section detection
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
        }`}
      initial={{ y: -100 }}
      animate={controls}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] scroll-progress transition-all duration-150"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: scrollProgress > 0.01 ? 1 : 0,
        }}
      />

      <nav className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-gradient">DV</span>
          <span className="text-primary">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1.5 flex items-center gap-0.5">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  href={link.href}
                  key={index}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium relative ${isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      layoutId="activeNavDot"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#contact">
              <Button size="sm">Contact Me</Button>
            </a>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden glass-strong border-t border-border/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  href={link.href}
                  key={index}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-muted-foreground hover:text-foreground py-2 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Contact Me</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
