import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';

const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.4}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#d4ff00"
          distort={0.45}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
};

const Sphere3D = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#d4ff00" />
          <AnimatedSphere />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Sphere3D;
