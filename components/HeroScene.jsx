'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Floating 3D text with glow effect
const FloatingText = ({ text, position, rotation = [0, 0, 0], color, size = 1, isDarkMode }) => {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      const time = clock.getElapsedTime();
      textRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        rotation={rotation}
        fontSize={size}
        color={color}
        font="/fonts/outfit-bold.ttf"
        maxWidth={10}
        textAlign="center"
        outlineWidth={0.02}
        outlineColor={isDarkMode ? '#111827' : '#f3f4f6'}
      >
        {text}
      </Text>
    </Float>
  );
};

// Animated skill cubes that float around
const SkillCube = ({ position, skill, color, isDarkMode }) => {
  const meshRef = useRef();
  const speedRef = useRef(0.2 + Math.random() * 0.3);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.x = time * speedRef.current * 0.2;
      meshRef.current.rotation.y = time * speedRef.current * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(time * speedRef.current) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
      <Text
        position={[0, 0, 0.51]}
        fontSize={0.25}
        color={isDarkMode ? '#ffffff' : '#000000'}
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </mesh>
  );
};

// Animated particle wave for background
const ParticleWave = ({ count = 1000, color }) => {
  const points = useRef();
  const [isReady, setIsReady] = useState(false);
  const particles = useRef([]);
  const dummy = useRef(new THREE.Object3D());

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = i * 0.1;
      const factor = 20 + (i % 100);
      const speed = 0.01 + (i % 200) / 20000;
      const xFactor = -50 + (i % 100);
      const yFactor = -50 + ((i + 50) % 100);
      const zFactor = -50 + ((i + 25) % 100);
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    particles.current = temp;
    setIsReady(true);
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current || !isReady) return;

    const time = clock.getElapsedTime();

    particles.current.forEach((particle, i) => {
      const { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      const a = Math.cos(t + time * speed * factor) * xFactor;
      const b = Math.sin(t + time * speed * factor) * yFactor;
      const c = Math.cos(t + time * speed * factor) * zFactor;

      dummy.current.position.set(a, b, c);
      dummy.current.updateMatrix();
      points.current.setMatrixAt(i, dummy.current.matrix);
    });

    points.current.instanceMatrix.needsUpdate = true;
  });

  if (!isReady) return null;

  return (
    <instancedMesh ref={points} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

// Main scene component
const HeroSceneContent = ({ isDarkMode }) => {
  const skills = [
    { name: 'React', color: "#61dafb", position: [-3, 0, -2] },
    { name: 'Next.js', color: isDarkMode ? '#ffffff' : '#000000', position: [3, 1, -4] },
    { name: 'Three.js', color: '#049ef4', position: [4, -1, -3] },
    { name: 'UI/UX', color: '#6b6b6b', position: [-5, -0.5, -5] },
    { name: 'Tailwind', color: '#38bdf8', position: [2, 2, -6] }
  ];

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const particleColor = isDarkMode ? '#ffffff' : '#000000';

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color={isDarkMode ? '#4f46e5' : '#3b82f6'}
      />

      <FloatingText
        text="Portfolio"
        position={[0, 2, 0]}
        color={textColor}
        size={2}
        isDarkMode={isDarkMode}
      />

      <FloatingText
        text="Creative Developer"
        position={[0, 0, 0]}
        color={isDarkMode ? '#a5b4fc' : '#4f46e5'}
        size={1}
        isDarkMode={isDarkMode}
      />

      {skills.map((skill, index) => (
        <SkillCube
          key={index}
          position={skill.position}
          skill={skill.name}
          color={skill.color}
          isDarkMode={isDarkMode}
        />
      ))}

      <ParticleWave count={800} color={particleColor} />
    </>
  );
};

// Export the main component
const HeroScene = ({ isDarkMode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-screen w-full" />;
  }

  return (
    <div className="h-screen w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        <HeroSceneContent isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
