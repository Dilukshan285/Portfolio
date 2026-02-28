import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Minimal floating particles with gravity-like orbits ───
const FloatingParticles = ({ count = 60 }) => {
    const meshRef = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 5;
            temp.push({
                orbitRadius: r,
                orbitAngle: theta,
                orbitTilt: phi,
                orbitSpeed: (Math.random() - 0.5) * 0.08,
                scale: Math.random() * 0.018 + 0.006,
                speed: Math.random() * 0.2 + 0.05,
                colorIdx: Math.floor(Math.random() * 4),
                yOffset: (Math.random() - 0.5) * 2,
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
            p.orbitAngle += p.orbitSpeed * 0.008;
            const x = p.orbitRadius * Math.cos(p.orbitAngle);
            const y = p.yOffset + Math.sin(t * p.speed + i * 0.2) * 0.8;
            const z = p.orbitRadius * Math.sin(p.orbitAngle) * 0.4;

            dummy.position.set(x, y, z - 2);
            const pulse = 1 + Math.sin(t * 1.5 + i) * 0.2;
            dummy.scale.setScalar(p.scale * pulse);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial toneMapped={false}>
                <instancedBufferAttribute attach="color" args={[colorArray, 3]} />
            </meshBasicMaterial>
        </instancedMesh>
    );
};

// ─── Subtle wireframe icosahedron ───
const WireframeShape = ({ position, color, scale = 1, rotationSpeed = 0.08 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        meshRef.current.rotation.x = t * rotationSpeed;
        meshRef.current.rotation.y = t * rotationSpeed * 0.7;
    });

    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.06}
                    toneMapped={false}
                />
            </mesh>
        </Float>
    );
};

// ─── Subtle distorted sphere ───
const SubtleSphere = () => {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
            <Sphere args={[1, 48, 48]} position={[-4, -1.5, -3]} scale={0.7}>
                <MeshDistortMaterial
                    color="#00f5d4"
                    wireframe
                    transparent
                    opacity={0.04}
                    distort={0.3}
                    speed={1.5}
                    toneMapped={false}
                />
            </Sphere>
        </Float>
    );
};

// ─── Single thin orbit ring ───
const OrbitRing = ({ radius, color, speed, tiltX }) => {
    const ref = useRef();

    useFrame((state) => {
        ref.current.rotation.x = tiltX;
        ref.current.rotation.z = state.clock.elapsedTime * speed;
    });

    return (
        <mesh ref={ref} position={[0, 0, -2]}>
            <torusGeometry args={[radius, 0.004, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.08} toneMapped={false} />
        </mesh>
    );
};

// ─── Mouse-reactive camera (subtle) ───
const CameraRig = () => {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame(() => {
        camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.015;
        camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.015;
        camera.lookAt(0, 0, 0);
    });

    return null;
};

// ─── Main Scene — Clean & Professional ───
const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.1} />
            <CameraRig />

            {/* Sparse floating particles */}
            <FloatingParticles count={50} />

            {/* Two subtle wireframe shapes, well-separated */}
            <WireframeShape position={[4, 1.5, -3]} color="#00f5d4" scale={1} rotationSpeed={0.06} />
            <WireframeShape position={[-3.5, -2, -4]} color="#7b2ff7" scale={0.8} rotationSpeed={0.04} />

            {/* Subtle distorted sphere */}
            <SubtleSphere />

            {/* Two thin orbit rings */}
            <OrbitRing radius={5} color="#00f5d4" speed={0.08} tiltX={Math.PI * 0.2} />
            <OrbitRing radius={6.5} color="#7b2ff7" speed={-0.05} tiltX={Math.PI * 0.4} />

            {/* Post-processing: gentle bloom only */}
            <EffectComposer>
                <Bloom
                    intensity={0.8}
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
};

// ─── Exported Component ───
export const FloatingGeometry = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};
