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
                perspective: "800px",
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

                {/* Holographic rainbow glare */}
                {glareEnabled && (
                    <div
                        className="absolute inset-0 rounded-[inherit] pointer-events-none"
                        style={{
                            background: isHovered
                                ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, 
                                    rgba(0, 245, 212, 0.06) 0%, 
                                    rgba(123, 47, 247, 0.04) 25%, 
                                    rgba(255, 45, 135, 0.03) 50%, 
                                    transparent 70%)`
                                : "none",
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.3s",
                            zIndex: 2,
                        }}
                    />
                )}

                {/* Edge glow on hover */}
                {glareEnabled && (
                    <div
                        className="absolute inset-0 rounded-[inherit] pointer-events-none"
                        style={{
                            boxShadow: isHovered
                                ? `inset 0 0 30px rgba(0, 245, 212, 0.05), 
                                   0 0 20px rgba(0, 245, 212, 0.08)`
                                : "none",
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.4s, box-shadow 0.4s",
                            zIndex: 1,
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};
