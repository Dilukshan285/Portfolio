import { useEffect, useRef } from "react";

// Advanced Sacred Geometry 3D Canvas — Metatron's Cube, orbiting shapes, cosmic particles
export const FloatingGeometry = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationId;

        const resize = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5,
            };
        };
        window.addEventListener("mousemove", handleMouseMove);

        // 3D math helpers
        const rotateX = (p, a) => {
            const c = Math.cos(a), s = Math.sin(a);
            return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
        };
        const rotateY = (p, a) => {
            const c = Math.cos(a), s = Math.sin(a);
            return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
        };
        const rotateZ = (p, a) => {
            const c = Math.cos(a), s = Math.sin(a);
            return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
        };
        const project = (pt, cx, cy, scale) => {
            const z = pt[2] + 5;
            const f = scale / z;
            return [cx + pt[0] * f, cy + pt[1] * f, z];
        };

        // ─── Metatron's Cube (13 circles + connecting lines) ───
        const metatronPoints = [];
        // Center
        metatronPoints.push([0, 0, 0]);
        // Inner hexagon
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            metatronPoints.push([Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0]);
        }
        // Outer hexagon
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
            metatronPoints.push([Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0]);
        }
        const metatronEdges = [];
        // Connect all points to each other for Metatron's Cube
        for (let i = 0; i < metatronPoints.length; i++) {
            for (let j = i + 1; j < metatronPoints.length; j++) {
                metatronEdges.push([i, j]);
            }
        }

        // ─── Torus Knot ───
        const torusKnotPoints = [];
        const torusKnotEdges = [];
        const knotSeg = 100;
        for (let i = 0; i < knotSeg; i++) {
            const t = (i / knotSeg) * Math.PI * 4;
            const r = 0.6 + 0.25 * Math.cos(1.5 * t);
            torusKnotPoints.push([r * Math.cos(t), r * Math.sin(t), 0.25 * Math.sin(1.5 * t)]);
            torusKnotEdges.push([i, (i + 1) % knotSeg]);
        }

        // ─── Icosahedron ───
        const phi = (1 + Math.sqrt(5)) / 2;
        const icoRaw = [
            [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
            [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
            [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
        ];
        const icoS = 0.4;
        const icoPoints = icoRaw.map((p) => [p[0] * icoS, p[1] * icoS, p[2] * icoS]);
        const icoEdges = [
            [0, 1], [0, 5], [0, 7], [0, 10], [0, 11], [1, 5], [1, 7], [1, 8], [1, 9],
            [2, 3], [2, 4], [2, 6], [2, 10], [2, 11], [3, 4], [3, 6], [3, 8], [3, 9],
            [4, 5], [4, 9], [4, 11], [5, 9], [5, 11], [6, 7], [6, 8], [6, 10],
            [7, 8], [7, 10], [8, 9], [10, 11],
        ];

        // ─── Dodecahedron ───
        const dodecPoints = [];
        const dodecEdges = [];
        const dodecSegs = 60;
        for (let i = 0; i < dodecSegs; i++) {
            const t = (i / dodecSegs) * Math.PI * 2;
            const r = 0.5 + 0.15 * Math.sin(t * 5);
            dodecPoints.push([r * Math.cos(t), r * Math.sin(t), 0.15 * Math.cos(t * 3)]);
            dodecEdges.push([i, (i + 1) % dodecSegs]);
        }

        // ─── Orbiting Ring ───
        const ringPoints = [];
        const ringEdges = [];
        const ringSeg = 64;
        for (let i = 0; i < ringSeg; i++) {
            const angle = (i / ringSeg) * Math.PI * 2;
            ringPoints.push([Math.cos(angle) * 0.65, Math.sin(angle) * 0.65, 0]);
            ringEdges.push([i, (i + 1) % ringSeg]);
        }

        // Shape configurations
        const shapes = [
            { pts: metatronPoints, edges: metatronEdges, offset: [2.5, 0.2, -1], color: [0, 245, 212], rotSpeed: [0.08, 0.12, 0.05], glowSize: 3 },
            { pts: torusKnotPoints, edges: torusKnotEdges, offset: [-2.8, -0.5, -0.5], color: [123, 47, 247], rotSpeed: [0.12, 0.15, 0], glowSize: 2 },
            { pts: icoPoints, edges: icoEdges, offset: [-1.5, 1.8, -1.5], color: [0, 180, 216], rotSpeed: [0.1, 0.08, 0.12], glowSize: 4 },
            { pts: dodecPoints, edges: dodecEdges, offset: [1.5, -2, -1], color: [255, 45, 135], rotSpeed: [0.06, 0.1, 0.08], glowSize: 2 },
            { pts: ringPoints, edges: ringEdges, offset: [0, 0.5, -2.5], color: [255, 215, 0], rotSpeed: [0.03, 0, 0.15], glowSize: 2 },
        ];

        // Cosmic dust particles
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 6,
                z: Math.random() * 4 + 1,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.003 + 0.001,
                offset: Math.random() * Math.PI * 2,
                color: [
                    [0, 245, 212],
                    [123, 47, 247],
                    [0, 180, 216],
                    [255, 45, 135],
                    [255, 215, 0],
                ][Math.floor(Math.random() * 5)],
            });
        }

        const animate = (time) => {
            const t = time * 0.001;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const scale = Math.min(canvas.width, canvas.height) * 0.38;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Draw shapes with glowing edges
            shapes.forEach((shape) => {
                const { pts, edges, offset, color, rotSpeed, glowSize } = shape;

                edges.forEach(([a, b]) => {
                    let pA = [...pts[a]];
                    let pB = [...pts[b]];

                    pA = rotateX(pA, t * rotSpeed[0] + my * 0.4);
                    pA = rotateY(pA, t * rotSpeed[1] + mx * 0.4);
                    pA = rotateZ(pA, t * rotSpeed[2]);
                    pB = rotateX(pB, t * rotSpeed[0] + my * 0.4);
                    pB = rotateY(pB, t * rotSpeed[1] + mx * 0.4);
                    pB = rotateZ(pB, t * rotSpeed[2]);

                    const floatY = Math.sin(t * 0.4 + offset[0]) * 0.2;
                    const floatX = Math.cos(t * 0.3 + offset[1]) * 0.1;
                    pA = [pA[0] + offset[0] + floatX, pA[1] + offset[1] + floatY, pA[2] + offset[2]];
                    pB = [pB[0] + offset[0] + floatX, pB[1] + offset[1] + floatY, pB[2] + offset[2]];

                    const projA = project(pA, cx, cy, scale);
                    const projB = project(pB, cx, cy, scale);

                    // Glow layer
                    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.04)`;
                    ctx.lineWidth = glowSize + 2;
                    ctx.beginPath();
                    ctx.moveTo(projA[0], projA[1]);
                    ctx.lineTo(projB[0], projB[1]);
                    ctx.stroke();

                    // Main line
                    const opacity = 0.08 + Math.sin(t * 2 + a * 0.1) * 0.04;
                    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(projA[0], projA[1]);
                    ctx.lineTo(projB[0], projB[1]);
                    ctx.stroke();
                });

                // Glowing vertices
                pts.forEach((pt, idx) => {
                    let p = [...pt];
                    p = rotateX(p, t * rotSpeed[0] + my * 0.4);
                    p = rotateY(p, t * rotSpeed[1] + mx * 0.4);
                    p = rotateZ(p, t * rotSpeed[2]);
                    const floatY = Math.sin(t * 0.4 + offset[0]) * 0.2;
                    const floatX = Math.cos(t * 0.3 + offset[1]) * 0.1;
                    p = [p[0] + offset[0] + floatX, p[1] + offset[1] + floatY, p[2] + offset[2]];
                    const proj = project(p, cx, cy, scale);

                    const pulse = 0.15 + Math.sin(t * 3 + idx * 0.5) * 0.1;
                    const r = 1.5 + Math.sin(t * 2 + idx) * 0.5;

                    // Glow
                    const grad = ctx.createRadialGradient(proj[0], proj[1], 0, proj[0], proj[1], r * 4);
                    grad.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${pulse})`);
                    grad.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
                    ctx.beginPath();
                    ctx.arc(proj[0], proj[1], r * 4, 0, Math.PI * 2);
                    ctx.fillStyle = grad;
                    ctx.fill();

                    // Dot
                    ctx.beginPath();
                    ctx.arc(proj[0], proj[1], r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${pulse + 0.1})`;
                    ctx.fill();
                });
            });

            // Cosmic particles
            particles.forEach((p) => {
                const py = p.y + Math.sin(t * 0.5 + p.offset) * 0.4;
                const px = p.x + Math.cos(t * 0.3 + p.offset) * 0.2;
                const proj = project([px, py, p.z], cx, cy, scale);

                const pulse = 0.15 + Math.sin(t * 2 + p.offset) * 0.1;
                const size = p.size * (1 + Math.sin(t + p.offset) * 0.3);

                // Glow
                const grad = ctx.createRadialGradient(proj[0], proj[1], 0, proj[0], proj[1], size * 5);
                grad.addColorStop(0, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${pulse})`);
                grad.addColorStop(1, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0)`);
                ctx.beginPath();
                ctx.arc(proj[0], proj[1], size * 5, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(proj[0], proj[1], size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${pulse + 0.1})`;
                ctx.fill();
            });

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
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};
