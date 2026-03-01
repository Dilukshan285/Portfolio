import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dilukshanviyapury25@gmail.com",
    href: "mailto:dilukshanviyapury25@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+94 77 052 2002",
    href: "tel:+94770522002",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dehiwala, Colombo, Sri Lanka",
    href: "#",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitStatus({
        type: "error",
        message:
          err.message || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 cosmic-mesh opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
              Get In Touch
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary" />
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's build{" "}
              <span className="font-serif italic font-normal text-gradient-warm">
                something great.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-base">
              Have a project in mind? I'd love to hear about it. Send me a
              message and let's discuss how we can work together.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Reveal variant="fadeLeft">
            <TiltCard tiltAmount={4}>
              <motion.div
                className="glass-divine p-6 sm:p-8 rounded-2xl border border-transparent hover:border-primary/15 relative overflow-hidden"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent-blue to-accent" />

                <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-base font-medium mb-2 font-mono"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name..."
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 sm:py-3.5 bg-surface rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50 input-glow text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-medium mb-2 font-mono"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 sm:py-3.5 bg-surface rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50 input-glow text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-base font-medium mb-2 font-mono"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 sm:py-3.5 bg-surface rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50 resize-none input-glow text-base"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="w-full"
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block"
                          >
                            <Send className="w-5 h-5" />
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-3 p-4 rounded-xl ${submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="text-base">{submitStatus.message}</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </TiltCard>
          </Reveal>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <Reveal variant="fadeRight">
              <TiltCard tiltAmount={5}>
                <div className="glass-divine rounded-2xl p-6 sm:p-8 border border-transparent hover:border-primary/15 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-primary" />
                    </motion.div>
                    Contact Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {contactInfo.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.href}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-surface transition-all group/item"
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-all duration-300"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                        >
                          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </motion.div>
                        <div>
                          <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                            {item.label}
                          </div>
                          <div className="text-sm sm:text-base font-medium group-hover/item:text-primary transition-colors">
                            {item.value}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Availability Card */}
            <Reveal variant="fadeRight" delay={0.15}>
              <TiltCard tiltAmount={5}>
                <div className="glass-divine rounded-2xl p-6 sm:p-8 border border-primary/15 relative overflow-hidden holographic">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-primary" />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                    <span className="font-medium">Currently Available</span>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    I'm currently open to internship and junior engineering
                    opportunities. Whether you need a full-stack developer or
                    an AI/ML collaborator, let's connect!
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
