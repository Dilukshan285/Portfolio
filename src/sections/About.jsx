import { Code2, BrainCircuit, Rocket, Users } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Dev",
    description:
      "Production-grade MERN applications shipped for international UK clients with CI/CD pipelines.",
    color: "primary",
    gradient: "from-primary to-accent-blue",
  },
  {
    icon: BrainCircuit,
    title: "AI / ML Research",
    description:
      "Federated learning, computer vision (YOLO), NLP, and explainable AI research on medical datasets.",
    color: "accent",
    gradient: "from-accent to-accent-pink",
  },
  {
    icon: Rocket,
    title: "Production Systems",
    description:
      "Live payroll portals, e-commerce platforms, and automated DevOps workflows deployed at scale.",
    color: "accent-blue",
    gradient: "from-accent-blue to-primary",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Cross-functional teamwork with UK-based stakeholders, Agile sprints, and clear communication.",
    color: "accent-pink",
    gradient: "from-accent-pink to-highlight",
  },
];

const stats = [
  { value: 7, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "", label: "UK Clients" },
  { value: 10, suffix: "", label: "AI Diseases Dx" },
  { value: 0.89, suffix: "", label: "AUROC Score" },
];

const AnimatedCounter = ({ value, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const isFloat = String(value).includes(".");
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(current.toFixed(2)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-2xl md:text-3xl font-bold text-gradient"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-xs text-muted-foreground mt-1 font-mono">
        {label}
      </div>
    </div>
  );
};

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
              <div className="glass rounded-2xl p-6 glow-border relative overflow-hidden shine holographic">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-accent-blue" />
                <p className="text-lg font-medium italic text-foreground pl-4">
                  "My mission is to build intelligent, production-grade systems
                  that solve real problems — merging AI innovation with robust
                  full-stack engineering."
                </p>
              </div>
            </Reveal>

            {/* Animated Stats Row */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <AnimatedCounter
                    key={idx}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column - 3D Tilt Highlight Cards */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-5" staggerDelay={0.12}>
            {highlights.map((item, idx) => (
              <StaggerItem key={idx}>
                <TiltCard tiltAmount={12}>
                  <div className="glass p-6 rounded-2xl shine group border border-transparent hover:border-primary/20 relative overflow-hidden">
                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <motion.div
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-500"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
