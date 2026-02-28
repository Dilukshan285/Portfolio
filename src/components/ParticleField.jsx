import { useEffect, useRef } from "react";

export const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseSpeedX = (Math.random() - 0.5) * 0.3;
        this.baseSpeedY = (Math.random() - 0.5) * 0.3;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.baseOpacity = this.opacity;
        this.hue = Math.random() > 0.5 ? 165 : 220;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      update(time) {
        // Mouse interaction — repel
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          this.speedX += Math.cos(angle) * force * 0.8;
          this.speedY += Math.sin(angle) * force * 0.8;
          this.opacity = Math.min(0.8, this.baseOpacity + force * 0.4);
        } else {
          this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }

        // Damping — return to base speed
        this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
        this.speedY += (this.baseSpeedY - this.speedY) * 0.02;

        this.x += this.speedX;
        this.y += this.speedY;

        // Color breathing
        this.hue = 165 + Math.sin(time * 0.0005 + this.pulseOffset) * 30;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
        ctx.fill();
      }
    }

    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = 0.08 * (1 - dist / 150);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(165, 80%, 50%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(time);
        p.draw();
      });
      drawLines();
      animationId = requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};
