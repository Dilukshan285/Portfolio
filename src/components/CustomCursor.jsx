import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const haloRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        document.body.classList.add("custom-cursor-active");

        const handleMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = (e) => {
            const el = e.target.closest("a, button, [role='button'], .cursor-hover, input, textarea");
            if (el) setIsHovering(true);
        };
        const handleMouseLeave = (e) => {
            const el = e.target.closest("a, button, [role='button'], .cursor-hover, input, textarea");
            if (el) setIsHovering(false);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        let frameId;
        const animate = () => {
            // Inner dot follows instantly
            pos.current.x += (target.current.x - pos.current.x) * 0.2;
            pos.current.y += (target.current.y - pos.current.y) * 0.2;

            // Ring follows with delay
            ringPos.current.x += (target.current.x - ringPos.current.x) * 0.1;
            ringPos.current.y += (target.current.y - ringPos.current.y) * 0.1;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : isClicking ? 0.8 : 1})`;
            }
            if (haloRef.current) {
                haloRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 2.2 : isClicking ? 0.6 : 1})`;
            }

            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(frameId);
        };
    }, [isVisible, isHovering, isClicking]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Inner dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease, transform 0.1s ease",
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: "7px",
                        height: "7px",
                        background: "linear-gradient(135deg, var(--color-primary), var(--color-accent-blue))",
                        boxShadow: `0 0 10px var(--color-primary), 0 0 20px color-mix(in srgb, var(--color-primary) 50%, transparent)`,
                    }}
                />
            </div>

            {/* Middle ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease, transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: "32px",
                        height: "32px",
                        border: `1.5px solid color-mix(in srgb, var(--color-primary) ${isHovering ? "60%" : "25%"}, transparent)`,
                        background: isHovering
                            ? "color-mix(in srgb, var(--color-primary) 8%, transparent)"
                            : "transparent",
                        transition: "border-color 0.3s, background 0.3s, width 0.3s, height 0.3s",
                    }}
                />
            </div>

            {/* Outer halo */}
            <div
                ref={haloRef}
                className="fixed top-0 left-0 z-[9997] pointer-events-none"
                style={{
                    opacity: isVisible ? 0.4 : 0,
                    transition: "opacity 0.4s ease, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: "50px",
                        height: "50px",
                        border: `1px solid color-mix(in srgb, var(--color-accent) ${isHovering ? "30%" : "10%"}, transparent)`,
                        background: "transparent",
                        transition: "border-color 0.4s, width 0.4s, height 0.4s",
                    }}
                />
            </div>
        </>
    );
};
