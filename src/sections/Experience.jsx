import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { getTechLogo } from "@/utils/techLogos";

const experiences = [
  {
    period: "2025 — Present",
    role: "AI/ML Research — FedMed",
    company: "SLIIT (Final Year Research)",
    description:
      "Conducting active research on privacy-preserving federated learning for multi-modal medical AI. Building a system that diagnoses 10 diseases across 2 hospitals using MIMIC-IV data with a custom DW-FedAvg algorithm achieving 0.89 AUROC.",
    technologies: ["Python", "PyTorch", "BioClinicalBERT", "ResNet-50", "CUDA"],
    current: true,
  },
  {
    period: "2025 — Present",
    role: "Full-Stack Developer (UK Client)",
    company: "Watson-News — Candy E-commerce",
    description:
      "Building a full-stack e-commerce platform for a UK candy retailer with multilingual UI, Firebase OAuth, custom OTP verification, promotions engine, and a role-based admin dashboard.",
    technologies: ["React 18", "Redux Toolkit", "Node.js", "MySQL", "Firebase"],
    current: true,
  },
  {
    period: "2024 — Present",
    role: "Full-Stack Developer (UK Client)",
    company: "ShopsTime — Supermarket Payroll Portal",
    description:
      "Developed and deployed a production multi-shop payroll system for a UK supermarket. Includes shift management, automated payroll calculation, Excel report exports, and full audit-logging middleware.",
    technologies: ["React.js", "Node.js", "MySQL", "ExcelJS", "JWT"],
    current: true,
  },
  {
    period: "Feb 2023 — Aug 2023",
    role: "Sales Executive",
    company: "IPOSG, Sri Lanka",
    description:
      "Managed a portfolio of B2B client accounts and consistently met sales targets. Coordinated cross-functional teams to deliver tailored client solutions; strengthened negotiation and stakeholder communication skills.",
    technologies: ["B2B Sales", "Client Relations", "Negotiation", "Teamwork"],
    current: false,
  },
];

const education = [
  {
    period: "2023 — Present",
    degree: "BSc (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    detail: "4th Year, 1st Semester",
  },
  {
    period: "2019 — 2021",
    degree: "G.C.E. Advanced Level — Commerce Stream",
    institution: "Bambalapitiya Hindu College, Colombo",
    detail: "",
  },
  {
    period: "2018",
    degree: "Diploma in Information Technology",
    institution: "ESOFT Metro Campus, Sri Lanka",
    detail: "",
  },
  {
    period: "2017",
    degree: "G.C.E. Ordinary Level",
    institution: "Bambalapitiya Hindu College, Colombo",
    detail: "",
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 cosmic-mesh opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary">
              <Briefcase className="w-4 h-4" />
              Career Journey
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
              Experience that{" "}
              <span className="font-serif italic font-normal text-gradient-warm">
                speaks volumes.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              From shipping production systems for international UK clients to
              conducting AI/ML research — a timeline of my professional journey.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-0 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-primary via-accent/40 to-transparent" />
            {/* Energy pulse */}
            <motion.div
              className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary to-transparent"
              animate={{ y: ["0%", "2000%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.6 }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>

          {/* Experience Items */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, idx) => (
              <Reveal
                key={idx}
                variant={idx % 2 === 0 ? "fadeLeft" : "fadeRight"}
                delay={idx * 0.15}
              >
                <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-4 h-4 bg-background rounded-full border-2 border-primary flex items-center justify-center"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      style={{
                        boxShadow: "0 0 12px rgba(0, 245, 212, 0.4)",
                      }}
                    >
                      {exp.current && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`pl-10 sm:pl-8 md:pl-0 ${idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                      }`}
                  >
                    <TiltCard tiltAmount={6}>
                      <motion.div
                        className="glass-divine p-5 sm:p-6 rounded-2xl shine border border-transparent hover:border-primary/20 group relative overflow-hidden"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 20px 50px -10px rgba(0, 245, 212, 0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-sm text-primary font-mono">
                            {exp.period}
                          </span>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs border border-green-500/20"
                              style={{
                                boxShadow: "0 0 8px rgba(74, 222, 128, 0.2)",
                              }}
                            >
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              Active
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-muted-foreground text-base">{exp.company}</p>
                        <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
                          {exp.description}
                        </p>
                        <div
                          className={`flex flex-wrap gap-1.5 sm:gap-2 mt-4 ${idx % 2 === 0 ? "md:justify-end" : ""
                            }`}
                        >
                          {exp.technologies.map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-surface text-xs rounded-full text-foreground/70 font-mono border border-border hover:border-primary/30 hover:text-primary transition-all"
                            >
                              {getTechLogo(tech) && <img src={getTechLogo(tech)} alt={tech} className="w-3.5 h-3.5 object-contain" />}
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20 sm:mt-32">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary">
                <GraduationCap className="w-4 h-4" />
                Education
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-4">
                Academic{" "}
                <span className="font-serif italic font-normal text-gradient-warm">
                  foundation.
                </span>
              </h2>
            </Reveal>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-6" staggerDelay={0.1}>
            {education.map((edu, idx) => (
              <StaggerItem key={idx}>
                <TiltCard tiltAmount={8}>
                  <motion.div
                    className="glass-divine p-5 sm:p-6 rounded-2xl shine border border-transparent hover:border-primary/20 group relative overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 15px 40px -10px rgba(0, 245, 212, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-primary to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="text-sm text-primary font-mono">
                      {edu.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold mt-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {edu.institution}
                    </p>
                    {edu.detail && (
                      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                        {edu.detail}
                      </span>
                    )}
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
