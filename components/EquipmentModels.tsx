import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { Cylinder, Box, Torus, Sphere, Tube } from '@react-three/drei';
import * as THREE from 'three';

const MetalMaterial = ({ color = "#aaaaaa", roughness = 0.2, metalness = 0.9, ...props }: any) => (
  <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} {...props} />
);

const GripMaterial = ({ color = "#333333" }) => (
  <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
);

const PaddingMaterial = ({ color = "#eeeeee" }) => (
  <meshStandardMaterial color={color} roughness={0.9} metalness={0.0} />
);

// --- Foil ---
// Rectangular blade, small dish guard
export const FoilModel = (props: any) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && props.isRotating) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Blade */}
      <Box args={[0.1, 9, 0.1]} position={[0, 4.5, 0]}>
        <MetalMaterial color="#silver" />
      </Box>
      {/* Tip */}
      <Cylinder args={[0.15, 0.15, 0.2, 16]} position={[0, 9.1, 0]}>
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
      </Cylinder>
      {/* Guard (Bell) */}
      <Cylinder args={[1.2, 0.2, 0.5, 32]} position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
         <MetalMaterial color="#cccccc" />
      </Cylinder>
      {/* Grip */}
      <Cylinder args={[0.2, 0.3, 1.5, 8]} position={[0, -0.75, 0]}>
        <GripMaterial />
      </Cylinder>
      {/* Pommel */}
      <Cylinder args={[0.3, 0.2, 0.3, 16]} position={[0, -1.65, 0]}>
        <MetalMaterial color="#999999" />
      </Cylinder>
    </group>
  );
};

// --- Epee ---
// V-shaped blade (simulated with triangular cylinder), Large Bell Guard
export const EpeeModel = (props: any) => {
  const groupRef = useRef<Group>(null);
  
  useFrame(() => {
    if (groupRef.current && props.isRotating) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Blade (Stiffer, triangularish) */}
      <Cylinder args={[0.1, 0.2, 9, 3]} position={[0, 4.5, 0]}>
        <MetalMaterial color="#dddddd" />
      </Cylinder>
       {/* Tip */}
       <Cylinder args={[0.2, 0.2, 0.3, 16]} position={[0, 9.15, 0]}>
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.2} />
      </Cylinder>
      {/* Guard (Deep Bell) - Hemisphere-ish */}
      <group position={[0, 0.5, 0]}>
         <Sphere args={[1.8, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} rotation={[Math.PI, 0, 0]} scale={[1, 0.8, 1]}>
            <MetalMaterial color="#eeeeee" side={THREE.DoubleSide} />
         </Sphere>
      </group>
      {/* Grip (Pistol Grip roughly approximated) */}
      <Box args={[0.3, 1.2, 0.4]} position={[0, -0.6, 0.2]} rotation={[0.2, 0, 0]}>
        <GripMaterial color="#222" />
      </Box>
      <Box args={[0.3, 0.6, 0.8]} position={[0, -0.8, -0.2]} rotation={[-0.2, 0, 0]}>
        <GripMaterial color="#222" />
      </Box>
    </group>
  );
};

// --- Sabre ---
// Flat blade, Knuckle Bow Guard
export const SabreModel = (props: any) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current && props.isRotating) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
       {/* Blade (Flat, slightly curved) */}
      <Box args={[0.08, 8.8, 0.3]} position={[0, 4.4, 0.1]}>
         <MetalMaterial color="#cccccc" />
      </Box>
      
      {/* Guard (Bowl + Knuckle Bow) */}
      <group position={[0, 0.2, 0]}>
          {/* Main Cup */}
          <Sphere args={[1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} rotation={[Math.PI, 0, 0]}>
             <MetalMaterial color="#d4d4d4" side={THREE.DoubleSide}/>
          </Sphere>
          {/* Knuckle Bow */}
          <Torus args={[1.2, 0.1, 16, 32, Math.PI]} position={[0, -1.2, 1.2]} rotation={[0, Math.PI/2, 0]}>
             <MetalMaterial />
          </Torus>
      </group>

      {/* Grip */}
      <Cylinder args={[0.25, 0.3, 1.4, 12]} position={[0, -0.7, 0]}>
         <GripMaterial color="#1a1a1a" />
      </Cylinder>
    </group>
  );
};

// --- Mask ---
export const MaskModel = (props: any) => {
    const groupRef = useRef<Group>(null);
  
    useFrame(() => {
      if (groupRef.current && props.isRotating) {
        groupRef.current.rotation.y += 0.005;
      }
    });
  
    return (
      <group ref={groupRef} {...props} dispose={null}>
        {/* Main Mesh Cage */}
        <Sphere args={[2.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65]} rotation={[Math.PI/2, 0, 0]} scale={[0.9, 1, 1.1]}>
           <meshStandardMaterial color="#111" wireframe wireframeLinewidth={2} />
        </Sphere>
        <Sphere args={[2.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65]} rotation={[Math.PI/2, 0, 0]} scale={[0.9, 1, 1.1]}>
           <meshStandardMaterial color="#000" transparent opacity={0.8} side={THREE.BackSide}/>
        </Sphere>

        {/* Bib (Padding) */}
        <Sphere args={[2.6, 32, 12, 0, Math.PI * 2, Math.PI * 0.6, Math.PI * 0.4]} rotation={[Math.PI/2, 0, 0]} scale={[0.95, 1.05, 1.2]}>
             <PaddingMaterial color="#fff" />
        </Sphere>

        {/* Back Strap */}
        <Torus args={[2, 0.2, 16, 32, Math.PI]} position={[0, 0, -1]} rotation={[0, 0, Math.PI/2]}>
             <GripMaterial />
        </Torus>
      </group>
    );
  };