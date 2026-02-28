import { useEffect, useRef } from "react";

// Pure Canvas 3D wireframe geometry — no Three.js dependency
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
        const rotateX = (point, angle) => {
            const cos = Math.cos(angle), sin = Math.sin(angle);
            return [point[0], point[1] * cos - point[2] * sin, point[1] * sin + point[2] * cos];
        };
        const rotateY = (point, angle) => {
            const cos = Math.cos(angle), sin = Math.sin(angle);
            return [point[0] * cos + point[2] * sin, point[1], -point[0] * sin + point[2] * cos];
        };
        const rotateZ = (point, angle) => {
            const cos = Math.cos(angle), sin = Math.sin(angle);
            return [point[0] * cos - point[1] * sin, point[0] * sin + point[1] * cos, point[2]];
        };
        const project = (point, cx, cy, scale) => {
            const z = point[2] + 4;
            const f = scale / z;
            return [cx + point[0] * f, cy + point[1] * f, z];
        };

        // Torus knot vertices
        const torusKnotPoints = [];
        const torusKnotEdges = [];
        const knotSegments = 120;
        for (let i = 0; i < knotSegments; i++) {
            const t = (i / knotSegments) * Math.PI * 4;
            const r = 0.8 + 0.3 * Math.cos(1.5 * t);
            torusKnotPoints.push([r * Math.cos(t), r * Math.sin(t), 0.3 * Math.sin(1.5 * t)]);
            torusKnotEdges.push([i, (i + 1) % knotSegments]);
        }

        // Icosahedron vertices
        const phi = (1 + Math.sqrt(5)) / 2;
        const icoRaw = [
            [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
            [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
            [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
        ];
        const icoScale = 0.45;
        const icoPoints = icoRaw.map((p) => [p[0] * icoScale, p[1] * icoScale, p[2] * icoScale]);
        const icoEdges = [
            [0, 1], [0, 5], [0, 7], [0, 10], [0, 11], [1, 5], [1, 7], [1, 8], [1, 9],
            [2, 3], [2, 4], [2, 6], [2, 10], [2, 11], [3, 4], [3, 6], [3, 8], [3, 9],
            [4, 5], [4, 9], [4, 11], [5, 9], [5, 11], [6, 7], [6, 8], [6, 10],
            [7, 8], [7, 10], [8, 9], [10, 11],
        ];

        // Octahedron vertices
        const octScale = 0.35;
        const octPoints = [
            [0, octScale, 0], [0, -octScale, 0],
            [octScale, 0, 0], [-octScale, 0, 0],
            [0, 0, octScale], [0, 0, -octScale],
        ];
        const octEdges = [
            [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 4], [4, 3], [3, 5], [5, 2],
        ];

        // Ring
        const ringPoints = [];
        const ringEdges = [];
        const ringSegs = 48;
        for (let i = 0; i < ringSegs; i++) {
            const angle = (i / ringSegs) * Math.PI * 2;
            ringPoints.push([Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0]);
            ringEdges.push([i, (i + 1) % ringSegs]);
        }

        // Shapes with offsets and colors
        const shapes = [
            { pts: torusKnotPoints, edges: torusKnotEdges, offset: [2.2, 0, -1], color: "0, 212, 170", rotSpeed: [0.15, 0.2, 0] },
            { pts: icoPoints, edges: icoEdges, offset: [-2.2, 1.2, -0.5], color: "108, 99, 255", rotSpeed: [0.1, 0.08, 0.12] },
            { pts: octPoints, edges: octEdges, offset: [0.8, -1.5, -1], color: "79, 195, 247", rotSpeed: [0.12, 0.15, 0.08] },
            { pts: ringPoints, edges: ringEdges, offset: [-1, -0.3, -2], color: "255, 107, 157", rotSpeed: [0.05, 0, 0.1] },
        ];

        // Floating particles
        const particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: (Math.random() - 0.5) * 6,
                y: (Math.random() - 0.5) * 5,
                z: Math.random() * 3 + 1,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.002 + 0.001,
                offset: Math.random() * Math.PI * 2,
            });
        }

        const animate = (time) => {
            const t = time * 0.001;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const scale = Math.min(canvas.width, canvas.height) * 0.4;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Draw shapes
            shapes.forEach((shape) => {
                const { pts, edges, offset, color, rotSpeed } = shape;

                ctx.strokeStyle = `rgba(${color}, 0.12)`;
                ctx.lineWidth = 1;

                edges.forEach(([a, b]) => {
                    let pA = [...pts[a]];
                    let pB = [...pts[b]];

                    // Rotate
                    pA = rotateX(pA, t * rotSpeed[0] + my * 0.3);
                    pA = rotateY(pA, t * rotSpeed[1] + mx * 0.3);
                    pA = rotateZ(pA, t * rotSpeed[2]);
                    pB = rotateX(pB, t * rotSpeed[0] + my * 0.3);
                    pB = rotateY(pB, t * rotSpeed[1] + mx * 0.3);
                    pB = rotateZ(pB, t * rotSpeed[2]);

                    // Offset + float
                    const floatY = Math.sin(t * 0.5 + offset[0]) * 0.15;
                    pA = [pA[0] + offset[0], pA[1] + offset[1] + floatY, pA[2] + offset[2]];
                    pB = [pB[0] + offset[0], pB[1] + offset[1] + floatY, pB[2] + offset[2]];

                    const projA = project(pA, cx, cy, scale);
                    const projB = project(pB, cx, cy, scale);

                    ctx.beginPath();
                    ctx.moveTo(projA[0], projA[1]);
                    ctx.lineTo(projB[0], projB[1]);
                    ctx.stroke();
                });
            });

            // Draw particles
            particles.forEach((p) => {
                const py = p.y + Math.sin(t * 0.5 + p.offset) * 0.3;
                const proj = project([p.x, py, p.z], cx, cy, scale);
                ctx.beginPath();
                ctx.arc(proj[0], proj[1], p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 170, 0.2)`;
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
