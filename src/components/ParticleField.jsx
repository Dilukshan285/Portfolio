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

    const cosmicColors = [
      { h: 165, s: 90, l: 55 }, // cyan/teal
      { h: 265, s: 85, l: 60 }, // violet
      { h: 195, s: 85, l: 55 }, // blue
      { h: 340, s: 90, l: 55 }, // pink
      { h: 50, s: 90, l: 55 },  // gold
    ];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseSpeedX = (Math.random() - 0.5) * 0.25;
        this.baseSpeedY = (Math.random() - 0.5) * 0.25;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.baseOpacity = this.opacity;
        this.colorIdx = Math.floor(Math.random() * cosmicColors.length);
        this.hue = cosmicColors[this.colorIdx].h;
        this.sat = cosmicColors[this.colorIdx].s;
        this.lit = cosmicColors[this.colorIdx].l;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.002 + 0.001;
        this.glowSize = this.size * (2 + Math.random() * 3);
      }
      update(time) {
        // Mouse interaction — magnetic attraction/repulsion
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          // Inner particles repel, outer attract slightly
          if (dist < 80) {
            this.speedX += Math.cos(angle) * force * 1.2;
            this.speedY += Math.sin(angle) * force * 1.2;
          } else {
            this.speedX -= Math.cos(angle) * force * 0.3;
            this.speedY -= Math.sin(angle) * force * 0.3;
          }
          this.opacity = Math.min(0.9, this.baseOpacity + force * 0.5);
        } else {
          this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }

        // Damping
        this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
        this.speedY += (this.baseSpeedY - this.speedY) * 0.02;

        this.x += this.speedX;
        this.y += this.speedY;

        // Color cycling
        this.hue = cosmicColors[this.colorIdx].h + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 15;

        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
      }
      draw() {
        // Glow
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
        grad.addColorStop(0, `hsla(${this.hue}, ${this.sat}%, ${this.lit}%, ${this.opacity * 0.5})`);
        grad.addColorStop(1, `hsla(${this.hue}, ${this.sat}%, ${this.lit}%, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.sat}%, ${this.lit}%, ${this.opacity})`;
        ctx.fill();
      }
    }

    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const opacity = 0.06 * (1 - dist / 160);
            // Use gradient line between the two particle colors
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, `hsla(${particles[i].hue}, ${particles[i].sat}%, ${particles[i].lit}%, ${opacity})`);
            grad.addColorStop(1, `hsla(${particles[j].hue}, ${particles[j].sat}%, ${particles[j].lit}%, ${opacity})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = grad;
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
      style={{ opacity: 0.6 }}
    />
  );
};
