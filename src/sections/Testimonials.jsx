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
import { motion } from "framer-motion";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Python", "JavaScript", "Java", "PHP", "HTML5", "CSS3", "SQL"],
    gradient: "from-primary to-accent-blue",
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
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express.js", "Spring Boot", "Flask", "FastAPI"],
    gradient: "from-accent to-accent-pink",
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["MongoDB", "MongoDB Atlas", "MySQL", "Mongoose"],
    gradient: "from-accent-pink to-highlight",
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
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
              <span className="w-8 h-px bg-primary" />
              Technical Expertise
              <span className="w-8 h-px bg-primary" />
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Skills that{" "}
              <span className="font-serif italic font-normal text-gradient-warm">
                drive results.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">
              A comprehensive toolkit spanning full-stack development, AI/ML
              research, computer vision, and modern DevOps practices.
            </p>
          </Reveal>
        </div>

        {/* Skills Grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
          staggerDelay={0.08}
        >
          {skillCategories.map((category, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                className="glass p-6 rounded-2xl card-hover shine border border-transparent hover:border-primary/20 group relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1.5 rounded-full bg-surface text-xs font-mono border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Methodologies */}
        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-5 font-mono uppercase tracking-widest">
              Methodologies & Practices
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {methodologies.map((method, idx) => (
                <motion.span
                  key={idx}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.05, y: -2 }}
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
