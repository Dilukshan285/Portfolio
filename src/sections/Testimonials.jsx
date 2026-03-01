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

const d = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const dl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: [
      { name: "Python", logo: `${d}/python/python-original.svg` },
      { name: "JavaScript", logo: `${d}/javascript/javascript-original.svg` },
      { name: "Java", logo: `${d}/java/java-original.svg` },
      { name: "PHP", logo: `${d}/php/php-original.svg` },
      { name: "HTML5", logo: `${d}/html5/html5-original.svg` },
      { name: "CSS3", logo: `${d}/css3/css3-original.svg` },
      { name: "SQL", logo: `${dl}/azuresqldatabase/azuresqldatabase-original.svg` },
    ],
    gradient: "from-primary to-accent-blue",
    glowColor: "rgba(0, 245, 212, 0.15)",
  },
  {
    icon: Globe,
    title: "Frontend",
    skills: [
      { name: "React.js", logo: `${d}/react/react-original.svg` },
      { name: "Redux Toolkit", logo: `${d}/redux/redux-original.svg` },
      { name: "Next.js", logo: `${d}/nextjs/nextjs-original.svg` },
      { name: "Tailwind CSS", logo: `${dl}/tailwindcss/tailwindcss-original.svg` },
      { name: "Vite", logo: `${dl}/vitejs/vitejs-original.svg` },
      { name: "Framer Motion", logo: `${dl}/framermotion/framermotion-original.svg` },
      { name: "i18next", logo: `${d}/react/react-original.svg` },
    ],
    gradient: "from-accent-blue to-accent",
    glowColor: "rgba(0, 180, 216, 0.15)",
  },
  {
    icon: Server,
    title: "Backend",
    skills: [
      { name: "Node.js", logo: `${d}/nodejs/nodejs-original.svg` },
      { name: "Express.js", logo: `${d}/express/express-original.svg` },
      { name: "Spring Boot", logo: `${d}/spring/spring-original.svg` },
      { name: "Flask", logo: `${d}/flask/flask-original.svg` },
      { name: "FastAPI", logo: `${d}/fastapi/fastapi-original.svg` },
    ],
    gradient: "from-accent to-accent-pink",
    glowColor: "rgba(123, 47, 247, 0.15)",
  },
  {
    icon: Database,
    title: "Databases",
    skills: [
      { name: "MongoDB", logo: `${d}/mongodb/mongodb-original.svg` },
      { name: "MongoDB Atlas", logo: `${d}/mongodb/mongodb-original.svg` },
      { name: "MySQL", logo: `${d}/mysql/mysql-original.svg` },
      { name: "Mongoose", logo: `${d}/mongoose/mongoose-original.svg` },
    ],
    gradient: "from-accent-pink to-highlight",
    glowColor: "rgba(255, 45, 135, 0.15)",
  },
  {
    icon: BrainCircuit,
    title: "AI / ML",
    skills: [
      { name: "PyTorch", logo: `${d}/pytorch/pytorch-original.svg` },
      { name: "scikit-learn", logo: `${dl}/scikitlearn/scikitlearn-original.svg` },
      { name: "Federated Learning", logo: `${d}/python/python-original.svg` },
      { name: "NLP", logo: `${d}/python/python-original.svg` },
      { name: "XAI", logo: `${d}/python/python-original.svg` },
    ],
    gradient: "from-highlight to-primary",
    glowColor: "rgba(255, 215, 0, 0.15)",
  },
  {
    icon: Eye,
    title: "Vision & Data",
    skills: [
      { name: "YOLOv8", logo: `${d}/python/python-original.svg` },
      { name: "YOLO11", logo: `${d}/python/python-original.svg` },
      { name: "SBERT", logo: `${d}/python/python-original.svg` },
      { name: "Pandas", logo: `${d}/pandas/pandas-original.svg` },
      { name: "NumPy", logo: `${d}/numpy/numpy-original.svg` },
      { name: "BeautifulSoup", logo: `${d}/python/python-original.svg` },
    ],
    gradient: "from-primary to-accent",
    glowColor: "rgba(0, 245, 212, 0.15)",
  },
  {
    icon: Wrench,
    title: "Tools & DevOps",
    skills: [
      { name: "Git", logo: `${d}/git/git-original.svg` },
      { name: "GitHub Actions", logo: `${d}/github/github-original.svg` },
      { name: "Jest", logo: `${d}/jest/jest-plain.svg` },
      { name: "Cypress", logo: `${dl}/cypressio/cypressio-original.svg` },
      { name: "Firebase", logo: `${d}/firebase/firebase-plain.svg` },
      { name: "Postman", logo: `${dl}/postman/postman-original.svg` },
      { name: "AWS", logo: `${dl}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: "CUDA", logo: `${d}/python/python-original.svg` },
      { name: "Docker", logo: `${d}/docker/docker-original.svg` },
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
            <p className="text-muted-foreground leading-relaxed text-base sm:text-base">
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
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface text-xs font-mono border border-border text-foreground/70 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <img src={skill.logo} alt={skill.name} className="w-3.5 h-3.5 object-contain" />
                        {skill.name}
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
