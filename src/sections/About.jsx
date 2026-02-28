import { Code2, BrainCircuit, Rocket, Users } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Dev",
    description:
      "Production-grade MERN applications shipped for international UK clients with CI/CD pipelines.",
    color: "primary",
  },
  {
    icon: BrainCircuit,
    title: "AI / ML Research",
    description:
      "Federated learning, computer vision (YOLO), NLP, and explainable AI research on medical datasets.",
    color: "accent",
  },
  {
    icon: Rocket,
    title: "Production Systems",
    description:
      "Live payroll portals, e-commerce platforms, and automated DevOps workflows deployed at scale.",
    color: "accent-blue",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Cross-functional teamwork with UK-based stakeholders, Agile sprints, and clear communication.",
    color: "accent-pink",
  },
];

const stats = [
  { value: "7+", label: "Projects Built" },
  { value: "2", label: "UK Clients" },
  { value: "10", label: "AI Diseases Dx" },
  { value: "0.89", label: "AUROC Score" },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Bg mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-8 h-px bg-primary" />
                About Me
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Engineering the future,
                <span className="font-serif italic font-normal text-gradient-warm">
                  {" "}
                  one system at a time.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a final-year BSc Information Technology undergraduate at
                  SLIIT with a passion for bridging the gap between intelligent
                  AI systems and production-ready full-stack applications. I
                  have a track record of shipping real-world systems for
                  international UK clients.
                </p>
                <p>
                  My expertise spans the MERN stack (React, Node.js, Express,
                  MongoDB/MySQL), Python deep learning with PyTorch, computer
                  vision using YOLOv8/YOLO11, NLP with Sentence Transformers,
                  and DevOps practices including GitHub Actions CI/CD pipelines.
                </p>
                <p>
                  Currently, I'm conducting active research on federated
                  medical AI — building privacy-preserving diagnostic systems
                  that work across multiple hospital datasets without sharing
                  raw patient records.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="glass rounded-2xl p-6 glow-border relative overflow-hidden shine">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-accent-blue" />
                <p className="text-lg font-medium italic text-foreground pl-4">
                  "My mission is to build intelligent, production-grade systems
                  that solve real problems — merging AI innovation with robust
                  full-stack engineering."
                </p>
              </div>
            </Reveal>

            {/* Stats Row */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column - Highlights */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-5" staggerDelay={0.12}>
            {highlights.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="glass p-6 rounded-2xl card-hover shine group border border-transparent hover:border-primary/20">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
