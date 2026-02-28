import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        document.body.classList.add("custom-cursor-active");

        const handleMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = (e) => {
            const el = e.target.closest("button, [role='button'], .cursor-hover");
            if (el) setIsHovering(true);
        };
        const handleMouseLeave = (e) => {
            const el = e.target.closest("button, [role='button'], .cursor-hover");
            if (el) setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);

        let frameId;
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.15;
            pos.current.y += (target.current.y - pos.current.y) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
            }
            if (trailRef.current) {
                trailRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
            }

            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(frameId);
        };
    }, [isVisible, isHovering]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Main dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: "6px",
                        height: "6px",
                        background: "var(--color-primary)",
                        boxShadow: "0 0 8px var(--color-primary), 0 0 16px color-mix(in srgb, var(--color-primary) 40%, transparent)",
                    }}
                />
            </div>

            {/* Trail ring */}
            <div
                ref={trailRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease, transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: "28px",
                        height: "28px",
                        border: `1px solid color-mix(in srgb, var(--color-primary) ${isHovering ? "50%" : "25%"}, transparent)`,
                        background: isHovering
                            ? "color-mix(in srgb, var(--color-primary) 5%, transparent)"
                            : "transparent",
                        transition: "border-color 0.3s, background 0.3s",
                    }}
                />
            </div>
        </>
    );
};
