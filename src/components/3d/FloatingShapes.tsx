
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shape component
const FloatingShape: React.FC<{ position: [number, number, number]; shape: 'sphere' | 'box' | 'octahedron'; color: string }> = ({ 
  position, 
  shape, 
  color 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + position[0]) * 0.3;
  });

  const ShapeComponent = useMemo(() => {
    const props = {
      ref: meshRef,
      position,
      castShadow: true,
      receiveShadow: true,
    };

    switch (shape) {
      case 'sphere':
        return <Sphere {...props} args={[0.8, 32, 32]} />;
      case 'box':
        return <Box {...props} args={[1.2, 1.2, 1.2]} />;
      case 'octahedron':
        return <Octahedron {...props} args={[1]} />;
      default:
        return <Sphere {...props} args={[0.8, 32, 32]} />;
    }
  }, [shape, position]);

  return (
    <group>
      {ShapeComponent}
      <meshStandardMaterial 
        color={color} 
        metalness={0.7} 
        roughness={0.2} 
        transparent 
        opacity={0.8}
      />
    </group>
  );
};

// Main 3D scene component
export const FloatingShapes: React.FC = () => {
  const shapes = useMemo(() => [
    { position: [-2, 1, 0] as [number, number, number], shape: 'sphere' as const, color: '#3b82f6' },
    { position: [2, -1, -1] as [number, number, number], shape: 'box' as const, color: '#8b5cf6' },
    { position: [0, 2, -2] as [number, number, number], shape: 'octahedron' as const, color: '#06b6d4' },
    { position: [-1.5, -1.5, 1] as [number, number, number], shape: 'sphere' as const, color: '#10b981' },
  ], []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="w-full h-full"
        shadows
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        {/* Floating shapes */}
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            position={shape.position}
            shape={shape.shape}
            color={shape.color}
          />
        ))}

        {/* Interactive controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
