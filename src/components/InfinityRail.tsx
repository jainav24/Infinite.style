import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Html, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

import productsData from '../data/products.json';

const InfinityPath = ({ products, radius = 5 }) => {
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);
  
  // Use a ref to store current rotation, modified by drag or auto
  const rotationRef = useRef(0);
  const [hovered, setHovered] = useState<number | null>(null);
  useCursor(hovered !== null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      if (hovered === null) {
        rotationRef.current += delta * 0.2;
      }
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      {products.map((product, i) => {
        // Infinity loop (Lissajous curve) parameters
        // x = A * sin(t), z = B * sin(2t) * cos(t) or similar
        // Since we are rotating the whole group, we can just place them in a static figure-8 and rotate it
        const t = (i / products.length) * Math.PI * 2;
        const x = Math.sin(t) * radius;
        const z = Math.sin(t * 2) * (radius / 1.5);
        const y = Math.cos(t) * 0.5; // Slight vertical wave
        
        return (
          <RailItem 
            key={product.id} 
            product={product} 
            position={[x, y, z]} 
            onHover={(v) => setHovered(v ? i : null)}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        );
      })}
    </group>
  );
};

const RailItem = ({ product, position, onHover, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Billboard behavior: always face camera
      meshRef.current.quaternion.copy(state.camera.quaternion);
      
      // Calculate distance to center to apply "scale up when near front" effect
      const distanceToCamera = state.camera.position.distanceTo(meshRef.current.getWorldPosition(new THREE.Vector3()));
      // Normalize scale based on distance (closer = bigger, farther = smaller and dimmer)
      const scale = Math.max(0.5, 3 - (distanceToCamera / 5));
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

      // We can also adjust opacity, but Image component handles material automatically
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); onHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); onHover(false); }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <planeGeometry args={[2, 3]} />
        <meshBasicMaterial transparent opacity={0} />
        
        <Image 
          url={product.image} 
          transparent 
          opacity={hovered ? 1 : 0.8}
          scale={[2, 3]} 
          toneMapped={false}
        />
        
        {hovered && (
          <Html position={[0, -1.8, 0]} center transform style={{ width: '200px' }}>
            <div className="flex flex-col items-center pointer-events-none">
              <div className="garment-tag shadow-lg shadow-orchid/30 animate-pulse bg-velvet text-porcelain border-orchid">
                ₹{product.price.toFixed(0)}
              </div>
              <h3 className="mt-2 text-porcelain font-display font-bold text-center text-sm px-2 py-1 bg-ink/80 rounded backdrop-blur-sm">
                {product.name}
              </h3>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

interface InfinityRailProps {
  products?: any[];
  height?: string;
  title?: string;
  radius?: number;
}

const InfinityRail: React.FC<InfinityRailProps> = ({ 
  products, 
  height = "h-[600px]", 
  title = "The Infinite Loop",
  radius = 6 
}) => {
  const defaultProducts = useMemo(() => productsData.filter(p => p.featured).slice(0, 8), []);
  const displayProducts = products || defaultProducts;

  return (
    <div className={`w-full ${height} cursor-grab active:cursor-grabbing relative bg-velvet overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <InfinityPath products={displayProducts} radius={radius} />
      </Canvas>
      {title && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <h2 className="text-porcelain font-display text-2xl md:text-4xl tracking-tight opacity-50">
            {title}
          </h2>
        </div>
      )}
    </div>
  );
};

export default InfinityRail;
