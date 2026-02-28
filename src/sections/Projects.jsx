import { ArrowUpRight, Github, ExternalLink, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

const base = import.meta.env.BASE_URL;

const projects = [
  {
    title: "FedMed — Federated Multi-Modal Medical AI",
    description:
      "Privacy-preserving federated learning system diagnosing 10 diseases across 2 hospitals using MIMIC-IV data. Custom DW-FedAvg algorithm with 5-channel multi-modal architecture fusing labs, X-rays (ResNet-50), and clinical notes (BioClinicalBERT). Achieves 0.89 AUROC.",
    images: [`${base}projects/project1.png`],
    tags: ["Python", "PyTorch", "MIMIC-IV", "BioClinicalBERT", "ResNet-50", "CUDA"],
    link: "#",
    github: "#",
    badge: "Research in Progress",
    featured: true,
  },
  {
    title: "Employee Promotion Prediction & HR System",
    description:
      "Full-stack MERN HR Management System with ML-powered promotion prediction. Features face-recognition login, attendance tracking, leave management, payroll processing, admin dashboards, and area-of-responsibility management. Integrated Flask ML backend using scikit-learn (94% accuracy) with competency-based assessment, development gap analysis, and professional recommendations.",
    images: [`${base}projects/HR1.png`, `${base}projects/HR2.png`],
    tags: ["React.js", "Node.js", "MongoDB", "Flask", "scikit-learn", "Face Recognition", "JWT"],
    link: "#",
    github: "https://github.com/Dilukshan285/Employee_promotion_prediction",
    badge: "Academic",
    featured: true,
  },
  {
    title: "Watson-News — Candy E-commerce (UK Client)",
    description:
      "Full-stack e-commerce platform for a UK candy retailer with multilingual UI (EN/FR via i18next), Firebase Google OAuth, custom OTP email-verification, promotions engine, wishlist, cart & checkout, and role-based admin dashboard.",
    images: [`${base}projects/project2.png`],
    tags: ["React 18", "Redux Toolkit", "Node.js", "MySQL", "Firebase", "i18next"],
    link: "#",
    github: "https://github.com/Dilukshan285/Watson-News",
    badge: "Client — In Progress",
  },
  {
    title: "ShopsTime — UK Supermarket Payroll Portal",
    description:
      "Production-deployed multi-shop payroll system for a UK supermarket client. Employee/shift management with UK timezone-aware auto status updates, automated payroll calculation, per-employee Excel exports, and full audit-logging middleware.",
    images: [`${base}projects/Wages1.png`, `${base}projects/Wages2.png`, `${base}projects/Wages3.png`],
    tags: ["React.js", "Node.js", "MySQL", "ExcelJS", "JWT", "Audit Middleware"],
    link: "https://shopstime.co.uk",
    github: "https://github.com/Dilukshan285/Wages",
    badge: "Live Production",
    featured: true,
  },
  {
    title: "Car Service Management System",
    description:
      "Full-stack vehicle service centre platform with multi-role access (Admin, Manager, Employee, Customer). Appointment booking, analytics dashboard, product store with cart/checkout, OTP verification, Firebase OAuth, and Sharp/Multer image processing.",
    images: [`${base}projects/project4.png`],
    tags: ["React 19", "Redux", "MongoDB", "Firebase", "JWT", "Sharp/Multer"],
    link: "#",
    github: "https://github.com/Dilukshan285/Car-Service-Management-System",
    badge: "Academic",
  },
  {
    title: "ElectroWave — Electronics E-commerce",
    description:
      "MERN electronics store with JWT auth, admin product/order management, cart and checkout. Full DevOps: GitHub Actions pipeline runs ESLint, Jest unit tests, and Cypress E2E on every push with automated Vercel deployment.",
    images: [`${base}projects/project1.png`],
    tags: ["React.js", "MongoDB", "Jest", "Cypress", "GitHub Actions", "Vercel"],
    link: "#",
    github: "https://github.com/Dilukshan285/Electro",
    badge: "Academic",
  },
  {
    title: "UniScraper — AI Course Recommendation Engine",
    description:
      "Intelligent course recommendation for 11 Sri Lankan universities. Custom HTML extractors, SBERT semantic search with cosine similarity, sklearn eligibility predictor, and FastAPI backend with MongoDB Atlas.",
    images: [`${base}projects/project2.png`],
    tags: ["Python", "FastAPI", "SBERT", "scikit-learn", "BeautifulSoup", "MongoDB Atlas"],
    link: "#",
    github: "#",
    badge: "Academic",
  },
  {
    title: "Haritha Hub — Plant E-commerce",
    description:
      "Full-stack plant marketplace with Redux Toolkit state management, role-based JWT auth, Multer/Sharp image pipeline, video tutorials, and animated UI with Framer Motion.",
    images: [`${base}projects/Haritha1.png`, `${base}projects/Haritha2.png`],
    tags: ["React 19", "Redux Toolkit", "MongoDB", "Framer Motion", "Sharp", "Multer"],
    link: "#",
    github: "https://github.com/Dilukshan285/Haritha_Hub",
    badge: "Academic",
  },
];

const getBadgeClasses = (badge) => {
  if (badge === "Live Production")
    return "bg-green-500/15 text-green-400 border-green-500/30";
  if (badge.includes("Progress"))
    return "bg-highlight/15 text-highlight border-highlight/30";
  return "bg-primary/15 text-primary border-primary/30";
};

// ─── Image Gallery Modal ───
const ImageGalleryModal = ({ project, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  }, [project]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl mx-4">
        {/* Close button */}
        <motion.button
          className="absolute -top-12 right-0 p-2 rounded-full glass text-foreground hover:text-primary hover:bg-primary/10 transition-all z-20"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Project Title */}
        <motion.h3
          className="text-xl font-bold mb-4 text-gradient"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {project.title}
        </motion.h3>

        {/* Image Container */}
        <motion.div
          className="relative glass rounded-2xl overflow-hidden border border-primary/15"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={project.images[currentIndex]}
              alt={`${project.title} - Screenshot ${currentIndex + 1}`}
              className="w-full h-auto max-h-[75vh] object-contain"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Navigation Arrows (only show if multiple images) */}
          {project.images.length > 1 && (
            <>
              <motion.button
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-border/40 text-foreground hover:text-primary hover:border-primary/30 transition-all"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-border/40 text-foreground hover:text-primary hover:border-primary/30 transition-all"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Thumbnails + Counter */}
        {project.images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            {/* Thumbnail dots */}
            <div className="flex items-center gap-2">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-lg overflow-hidden border-2 ${idx === currentIndex
                    ? "border-primary shadow-[0_0_12px_rgba(0,212,170,0.4)]"
                    : "border-border/30 opacity-50 hover:opacity-80"
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-16 h-10 object-cover"
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {currentIndex + 1} / {project.images.length}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [galleryProject, setGalleryProject] = useState(null);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
              <span className="w-8 h-px bg-primary" />
              Featured Work
              <span className="w-8 h-px bg-primary" />
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Projects that
              <span className="font-serif italic font-normal text-gradient-warm">
                {" "}
                solve real problems.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From live production systems for UK clients to AI research and
              full-stack academic projects across diverse tech stacks.
            </p>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <StaggerContainer
          className="grid md:grid-cols-2 gap-8"
          staggerDelay={0.1}
        >
          {projects.map((project, idx) => (
            <StaggerItem key={idx}>
              <TiltCard tiltAmount={6} className="h-full">
                <motion.div
                  className={`group glass rounded-2xl overflow-hidden shine border border-transparent hover:border-primary/20 relative h-full ${project.featured ? "md:row-span-1" : ""
                    }`}
                >
                  {/* Rotating border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--color-primary) 60deg, transparent 120deg)`,
                      filter: "blur(20px)",
                      transform: "scale(1.05)",
                    }}
                  />

                  {/* Image — clickable to open gallery */}
                  <div
                    className="relative overflow-hidden aspect-video cursor-pointer"
                    onClick={() => setGalleryProject(project)}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                    {/* Badge */}
                    {project.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getBadgeClasses(
                            project.badge
                          )}`}
                        >
                          {project.badge}
                        </span>
                      </div>
                    )}

                    {/* Multi-image indicator */}
                    {project.images.length > 1 && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-medium backdrop-blur-sm border border-border/40">
                          <Images className="w-3.5 h-3.5" />
                          {project.images.length}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay with action buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/20 backdrop-blur-sm">
                      {/* View Gallery Button */}
                      <motion.button
                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all border border-primary/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGalleryProject(project);
                        }}
                      >
                        <Images className="w-5 h-5" />
                      </motion.button>
                      {project.link !== "#" && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all border border-primary/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.github !== "#" && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all border border-primary/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 relative z-10">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <motion.span
                          key={tagIdx}
                          className="px-3 py-1.5 rounded-full bg-surface text-xs font-medium font-mono border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIdx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All CTA */}
        <Reveal delay={0.3}>
          <div className="text-center mt-16">
            <a
              href="https://github.com/Dilukshan285"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedBorderButton>
                View All on GitHub
                <ArrowUpRight className="w-5 h-5" />
              </AnimatedBorderButton>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {galleryProject && (
          <ImageGalleryModal
            project={galleryProject}
            isOpen={!!galleryProject}
            onClose={() => setGalleryProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
