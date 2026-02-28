import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Orbiting particles around the profile ───
const OrbitParticles = ({ count = 40 }) => {
    const meshRef = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const orbitRadius = 1.8 + Math.random() * 0.8;
            const orbitTilt = (Math.random() - 0.5) * Math.PI * 0.6;
            temp.push({
                angle,
                orbitRadius,
                orbitTilt,
                speed: 0.15 + Math.random() * 0.25,
                scale: 0.015 + Math.random() * 0.025,
                colorIdx: Math.floor(Math.random() * 4),
                yOffset: (Math.random() - 0.5) * 0.5,
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const colors = useMemo(() => [
        new THREE.Color("#00f5d4"),
        new THREE.Color("#7b2ff7"),
        new THREE.Color("#00b4d8"),
        new THREE.Color("#ff2d87"),
    ], []);

    const colorArray = useMemo(() => {
        const arr = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            const c = colors[p.colorIdx];
            arr[i * 3] = c.r;
            arr[i * 3 + 1] = c.g;
            arr[i * 3 + 2] = c.b;
        });
        return arr;
    }, [count, particles, colors]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        particles.forEach((p, i) => {
            const angle = p.angle + t * p.speed;
            const x = Math.cos(angle) * p.orbitRadius;
            const y = Math.sin(angle) * p.orbitRadius * Math.sin(p.orbitTilt) + p.yOffset;
            const z = Math.sin(angle) * p.orbitRadius * Math.cos(p.orbitTilt) * 0.3;

            dummy.position.set(x, y, z);
            const pulse = 1 + Math.sin(t * 3 + i) * 0.4;
            dummy.scale.setScalar(p.scale * pulse);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial toneMapped={false} color="#00f5d4" />
        </instancedMesh>
    );
};

// ─── Orbiting wireframe rings ───
const OrbitRing = ({ radius, color, speed, tiltX, tiltZ }) => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ref.current.rotation.x = tiltX + Math.sin(t * 0.2) * 0.05;
        ref.current.rotation.z = t * speed;
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.005, 16, 80]} />
            <meshBasicMaterial color={color} transparent opacity={0.25} toneMapped={false} />
        </mesh>
    );
};

// ─── Pulsing core ───
const PulsingCore = () => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const s = 0.15 + Math.sin(t * 2) * 0.05;
        ref.current.scale.setScalar(s);
        ref.current.material.opacity = 0.2 + Math.sin(t * 3) * 0.1;
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#00f5d4" transparent opacity={0.2} toneMapped={false} />
        </mesh>
    );
};

// ─── Scene ───
const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.1} />

            <OrbitParticles count={35} />
            <OrbitRing radius={2} color="#00f5d4" speed={0.2} tiltX={Math.PI * 0.15} tiltZ={0} />
            <OrbitRing radius={2.5} color="#7b2ff7" speed={-0.15} tiltX={Math.PI * 0.35} tiltZ={Math.PI * 0.1} />
            <PulsingCore />

            <EffectComposer>
                <Bloom intensity={2} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
            </EffectComposer>
        </>
    );
};

// ─── Exported Component ───
export const ProfileOrbit = () => {
    return (
        <div className="absolute inset-0 -inset-x-12 -inset-y-12 pointer-events-none" style={{ zIndex: 5 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};
