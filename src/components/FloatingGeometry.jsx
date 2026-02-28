import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const WireframeTorus = ({ mouse }) => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = Math.sin(t * 0.2) * 0.3 + mouse.current[1] * 0.3;
        ref.current.rotation.y = t * 0.15 + mouse.current[0] * 0.3;
        ref.current.position.y = Math.sin(t * 0.5) * 0.3;
    });

    return (
        <mesh ref={ref} position={[2.5, 0, -2]}>
            <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
            <meshStandardMaterial
                color="#00d4aa"
                wireframe
                transparent
                opacity={0.12}
                emissive="#00d4aa"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const GlassIcosahedron = ({ mouse }) => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = t * 0.1 + mouse.current[1] * 0.2;
        ref.current.rotation.z = t * 0.08;
        ref.current.position.y = Math.sin(t * 0.4 + 1) * 0.4;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={ref} position={[-3, 1.5, -2]}>
                <icosahedronGeometry args={[0.7, 0]} />
                <meshStandardMaterial
                    color="#6c63ff"
                    wireframe
                    transparent
                    opacity={0.1}
                    emissive="#6c63ff"
                    emissiveIntensity={0.3}
                />
            </mesh>
        </Float>
    );
};

const FloatingOctahedron = ({ mouse }) => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.12 + mouse.current[0] * 0.15;
        ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
        ref.current.position.y = Math.cos(t * 0.35 + 2) * 0.3;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh ref={ref} position={[-2, -2, -2.5]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color="#4fc3f7"
                    wireframe
                    transparent
                    opacity={0.08}
                    emissive="#4fc3f7"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
};

const FloatingRing = ({ mouse }) => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
        ref.current.rotation.z = t * 0.1;
        ref.current.position.y = Math.sin(t * 0.6) * 0.2;
    });

    return (
        <mesh ref={ref} position={[-1, -0.5, -4]}>
            <torusGeometry args={[1.2, 0.02, 16, 64]} />
            <meshStandardMaterial
                color="#ff6b9d"
                transparent
                opacity={0.1}
                emissive="#ff6b9d"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

const Particles = () => {
    const count = 40;
    const ref = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.02;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#00d4aa"
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    );
};

export const FloatingGeometry = () => {
    const mouse = useRef([0, 0]);

    const handlePointerMove = (e) => {
        mouse.current = [
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1,
        ];
    };

    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
            onPointerMove={handlePointerMove}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ pointerEvents: "none" }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.4} />
                <pointLight position={[-3, 2, 2]} intensity={0.2} color="#00d4aa" />
                <pointLight position={[3, -2, 2]} intensity={0.15} color="#6c63ff" />

                <WireframeTorus mouse={mouse} />
                <GlassIcosahedron mouse={mouse} />
                <FloatingOctahedron mouse={mouse} />
                <FloatingRing mouse={mouse} />
                <Particles />
            </Canvas>
        </div>
    );
};
