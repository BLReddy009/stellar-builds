import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function FloatingShape({
  position,
  color,
  speed = 1,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={1.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-40 dark:opacity-60"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -3, -2]} intensity={0.6} color="#f59e0b" />
          <FloatingShape position={[-3, 1.5, 0]} color="#f59e0b" speed={0.8} scale={1.2} />
          <FloatingShape position={[3, -1.2, -1]} color="#1e293b" speed={1.1} scale={1.6} />
          <FloatingShape position={[0, 2.5, -3]} color="#fbbf24" speed={0.6} scale={0.9} />
          <FloatingShape position={[2.2, 1.8, -2]} color="#334155" speed={1.3} scale={0.7} />
        </Suspense>
      </Canvas>
    </div>
  );
}