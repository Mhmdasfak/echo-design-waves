
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape: React.FC<{ position: [number, number, number]; color: string; speed: number }> = ({ 
  position, 
  color, 
  speed 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.4}
        />
      </Sphere>
    </mesh>
  );
};

const Scene: React.FC = () => {
  const shapes = useMemo(() => [
    { position: [2, 0, 0] as [number, number, number], color: '#ff6b6b', speed: 0.01 },
    { position: [-2, 2, -2] as [number, number, number], color: '#4ecdc4', speed: 0.015 },
    { position: [0, -2, -1] as [number, number, number], color: '#45b7d1', speed: 0.008 },
    { position: [3, 1, -3] as [number, number, number], color: '#96ceb4', speed: 0.012 },
    { position: [-1, -1, 1] as [number, number, number], color: '#ffa726', speed: 0.009 }
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          speed={shape.speed}
        />
      ))}
    </>
  );
};

const FloatingShapes: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
