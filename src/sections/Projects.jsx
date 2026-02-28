import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { motion } from "framer-motion";

const projects = [
  {
    title: "FedMed — Federated Multi-Modal Medical AI",
    description:
      "Privacy-preserving federated learning system diagnosing 10 diseases across 2 hospitals using MIMIC-IV data. Custom DW-FedAvg algorithm with 5-channel multi-modal architecture fusing labs, X-rays (ResNet-50), and clinical notes (BioClinicalBERT). Achieves 0.89 AUROC.",
    image: "/projects/project1.png",
    tags: ["Python", "PyTorch", "MIMIC-IV", "BioClinicalBERT", "ResNet-50", "CUDA"],
    link: "#",
    github: "#",
    badge: "Research in Progress",
    featured: true,
  },
  {
    title: "Watson-News — Candy E-commerce (UK Client)",
    description:
      "Full-stack e-commerce platform for a UK candy retailer with multilingual UI (EN/FR via i18next), Firebase Google OAuth, custom OTP email-verification, promotions engine, wishlist, cart & checkout, and role-based admin dashboard.",
    image: "/projects/project2.png",
    tags: ["React 18", "Redux Toolkit", "Node.js", "MySQL", "Firebase", "i18next"],
    link: "#",
    github: "https://github.com/Dilukshan285/Watson-News",
    badge: "Client — In Progress",
  },
  {
    title: "ShopsTime — UK Supermarket Payroll Portal",
    description:
      "Production-deployed multi-shop payroll system for a UK supermarket client. Employee/shift management with UK timezone-aware auto status updates, automated payroll calculation, per-employee Excel exports, and full audit-logging middleware.",
    image: "/projects/project3.png",
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
    image: "/projects/project4.png",
    tags: ["React 19", "Redux", "MongoDB", "Firebase", "JWT", "Sharp/Multer"],
    link: "#",
    github: "https://github.com/Dilukshan285/Car-Service-Management-System",
    badge: "Academic",
  },
  {
    title: "ElectroWave — Electronics E-commerce",
    description:
      "MERN electronics store with JWT auth, admin product/order management, cart and checkout. Full DevOps: GitHub Actions pipeline runs ESLint, Jest unit tests, and Cypress E2E on every push with automated Vercel deployment.",
    image: "/projects/project1.png",
    tags: ["React.js", "MongoDB", "Jest", "Cypress", "GitHub Actions", "Vercel"],
    link: "#",
    github: "https://github.com/Dilukshan285/Electro",
    badge: "Academic",
  },
  {
    title: "UniScraper — AI Course Recommendation Engine",
    description:
      "Intelligent course recommendation for 11 Sri Lankan universities. Custom HTML extractors, SBERT semantic search with cosine similarity, sklearn eligibility predictor, and FastAPI backend with MongoDB Atlas.",
    image: "/projects/project2.png",
    tags: ["Python", "FastAPI", "SBERT", "scikit-learn", "BeautifulSoup", "MongoDB Atlas"],
    link: "#",
    github: "#",
    badge: "Academic",
  },
  {
    title: "Haritha Hub — Plant E-commerce",
    description:
      "Full-stack plant marketplace with Redux Toolkit state management, role-based JWT auth, Multer/Sharp image pipeline, video tutorials, and animated UI with Framer Motion.",
    image: "/projects/project3.png",
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

export const Projects = () => {
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
              <motion.div
                className={`group glass rounded-2xl overflow-hidden card-hover shine border border-transparent hover:border-primary/20 ${
                  project.featured ? "md:row-span-1" : ""
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
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

                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/20 backdrop-blur-sm">
                    {project.link !== "#" && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all border border-primary/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
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
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
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
                      <span
                        key={tagIdx}
                        className="px-3 py-1.5 rounded-full bg-surface text-xs font-medium font-mono border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
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
    </section>
  );
};
