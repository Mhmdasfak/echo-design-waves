import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveShape: React.FC<{ 
  position: [number, number, number]; 
  color: string; 
  speed: number;
  index: number;
}> = ({ position, color, speed, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * speed) * 0.2;
      meshRef.current.rotation.y = Math.cos(time * speed * 0.7) * 0.3;
      
      // Interactive scaling
      const targetScale = hovered ? 1.2 : clicked ? 0.9 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const shapes = ['sphere', 'box', 'octahedron', 'torus', 'tetrahedron'];
  const shapeType = shapes[index % shapes.length];

  const renderGeometry = () => {
    switch (shapeType) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
      case 'torus':
        return <torusGeometry args={[0.8, 0.3, 16, 100]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1]} />;
      default:
        return <sphereGeometry args={[0.8, 32, 32]} />;
    }
  };

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
        castShadow
        receiveShadow
      >
        {renderGeometry()}
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.1}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

const Scene: React.FC = () => {
  const { camera } = useThree();
  
  // Harmonious color palette that works with the background gradient
  const shapes = useMemo(() => [
    { position: [2, 0, 0] as [number, number, number], color: '#667eea', speed: 0.8 },
    { position: [-2, 1, -1] as [number, number, number], color: '#764ba2', speed: 1.2 },
    { position: [0, -1.5, -2] as [number, number, number], color: '#f093fb', speed: 0.6 },
    { position: [3, 1.5, -2] as [number, number, number], color: '#4facfe', speed: 1.0 },
    { position: [-1.5, -0.5, 1] as [number, number, number], color: '#43e97b', speed: 0.9 }
  ], []);

  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#667eea" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#f093fb" />
      
      {/* Interactive shapes */}
      {shapes.map((shape, index) => (
        <InteractiveShape
          key={index}
          position={shape.position}
          color={shape.color}
          speed={shape.speed}
          index={index}
        />
      ))}
      
      {/* Orbit controls for user interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxDistance={10}
        minDistance={4}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const FloatingShapes: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
