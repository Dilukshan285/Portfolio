import {
  Code2,
  Server,
  Database,
  BrainCircuit,
  Eye,
  Wrench,
  Globe,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { motion } from "framer-motion";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Python", "JavaScript", "Java", "PHP", "HTML5", "CSS3", "SQL"],
    gradient: "from-primary to-accent-blue",
    glowColor: "rgba(0, 245, 212, 0.15)",
  },
  {
    icon: Globe,
    title: "Frontend",
    skills: [
      "React.js (v18/v19)",
      "Redux Toolkit",
      "Next.js",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "i18next",
    ],
    gradient: "from-accent-blue to-accent",
    glowColor: "rgba(0, 180, 216, 0.15)",
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express.js", "Spring Boot", "Flask", "FastAPI"],
    gradient: "from-accent to-accent-pink",
    glowColor: "rgba(123, 47, 247, 0.15)",
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["MongoDB", "MongoDB Atlas", "MySQL", "Mongoose"],
    gradient: "from-accent-pink to-highlight",
    glowColor: "rgba(255, 45, 135, 0.15)",
  },
  {
    icon: BrainCircuit,
    title: "AI / ML",
    skills: [
      "PyTorch",
      "scikit-learn",
      "Federated Learning (DW-FedAvg)",
      "NLP",
      "XAI (Grad-CAM, LIME, SHAP)",
    ],
    gradient: "from-highlight to-primary",
    glowColor: "rgba(255, 215, 0, 0.15)",
  },
  {
    icon: Eye,
    title: "Vision & Data",
    skills: [
      "YOLOv8",
      "YOLO11",
      "Sentence Transformers (SBERT)",
      "Pandas",
      "NumPy",
      "BeautifulSoup",
    ],
    gradient: "from-primary to-accent",
    glowColor: "rgba(0, 245, 212, 0.15)",
  },
  {
    icon: Wrench,
    title: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub Actions (CI/CD)",
      "Jest",
      "Cypress E2E",
      "Firebase",
      "Postman",
      "AWS",
      "CUDA",
      "ExcelJS",
    ],
    gradient: "from-accent to-accent-blue",
    glowColor: "rgba(123, 47, 247, 0.15)",
  },
];

const methodologies = [
  "RESTful APIs",
  "MVC",
  "OOP",
  "Agile/Scrum",
  "SDLC",
  "JWT Auth",
  "Audit Logging",
];

export const Testimonials = () => {
  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 cosmic-mesh opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
              Technical Expertise
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary" />
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
              Skills that{" "}
              <span className="font-serif italic font-normal text-gradient-warm">
                drive results.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              A comprehensive toolkit spanning full-stack development, AI/ML
              research, computer vision, and modern DevOps practices.
            </p>
          </Reveal>
        </div>

        {/* Skills Grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto"
          staggerDelay={0.08}
        >
          {skillCategories.map((category, idx) => (
            <StaggerItem key={idx}>
              <TiltCard tiltAmount={10}>
                <motion.div
                  className="glass-divine p-5 sm:p-6 rounded-2xl shine border border-transparent hover:border-primary/20 group relative overflow-hidden h-full"
                  whileHover={{
                    boxShadow: `0 0 40px ${category.glowColor}, 0 0 80px ${category.glowColor}`,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Top accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <motion.div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                    >
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]" />
                    </motion.div>
                    <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.span
                        key={skillIdx}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface text-xs font-mono border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Methodologies */}
        <Reveal delay={0.3}>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-5 font-mono uppercase tracking-widest">
              Methodologies & Practices
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
              {methodologies.map((method, idx) => (
                <motion.span
                  key={idx}
                  className="px-3 sm:px-4 py-2 rounded-full glass-divine text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {method}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
