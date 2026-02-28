import { useRef, useState } from "react";
import { motion } from "framer-motion";

export const TiltCard = ({
    children,
    className = "",
    tiltAmount = 10,
    glareEnabled = true,
    ...props
}) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            x: (y - 0.5) * -tiltAmount,
            y: (x - 0.5) * tiltAmount,
            glareX: x * 100,
            glareY: y * 100,
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1000px",
            }}
            {...props}
        >
            <motion.div
                className="relative"
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {children}

                {/* Glare overlay */}
                {glareEnabled && (
                    <div
                        className="absolute inset-0 rounded-[inherit] pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.3s",
                            zIndex: 2,
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};
