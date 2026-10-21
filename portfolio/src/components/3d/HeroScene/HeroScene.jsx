import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import themeData from "../../../data/themeData";
import "./HeroScene.css";

function CoreObject({ primary, secondary }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.3;

    const targetX = state.pointer.x * 0.18;
    const targetY = state.pointer.y * 0.12;

    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetX,
      0.05
    );

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY + meshRef.current.rotation.x,
      0.02
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshStandardMaterial
          color={primary}
          emissive={primary}
          emissiveIntensity={0.65}
          roughness={0.3}
          metalness={0.25}
          toneMapped={false}
          transparent
          opacity={0.96}
        />
      </mesh>

      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          color={secondary}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
    </Float>
  );
}

function InnerCore({ secondary }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <mesh scale={0.62}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={secondary}
          emissive={secondary}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.3}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius = 2.2, rotation = [0, 0, 0], speed = 0.2, color }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 12, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function TechnologyLabel({ children, position }) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.15}
      floatIntensity={0.5}
    >
      <group position={position}>
        <mesh>
          <planeGeometry args={[1.35, 0.45]} />
          <meshBasicMaterial
            color="#18181b"
            transparent
            opacity={0.82}
          />
        </mesh>

        <Text
          position={[0, 0, 0.02]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {children}
        </Text>
      </group>
    </Float>
  );
}

function SceneContent({ technologies = [], primary, secondary }) {
  const positions = [
    [-2.4, 1.45, 0],
    [2.35, 1.15, 0],
    [-2.5, -1.15, 0],
    [2.4, -1.45, 0]
  ];

  return (
    <>
      <ambientLight intensity={0.55} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={1.1}
        color="#ffffff"
      />

      <pointLight
        position={[-3, 2, 3]}
        intensity={1.25}
        color={primary}
      />

      <pointLight
        position={[3, -2, 2]}
        intensity={0.85}
        color={secondary}
      />

      <CoreObject primary={primary} secondary={secondary} />
      <InnerCore secondary={secondary} />

      <OrbitRing
        radius={2.15}
        rotation={[Math.PI / 2.7, 0.2, 0]}
        speed={0.25}
        color={secondary}
      />

      <OrbitRing
        radius={2.5}
        rotation={[0.7, Math.PI / 3, 0]}
        speed={-0.18}
        color={primary}
      />

      <OrbitRing
        radius={2.85}
        rotation={[Math.PI / 2, 0, Math.PI / 5]}
        speed={0.12}
        color={secondary}
      />

      <Suspense fallback={null}>
        {technologies.slice(0, 4).map((technology, index) => (
          <TechnologyLabel
            key={`${technology}-${index}`}
            position={positions[index]}
          >
            {technology}
          </TechnologyLabel>
        ))}
      </Suspense>

      <Sparkles
        count={100}
        scale={[7, 7, 5]}
        size={2}
        speed={0.3}
        opacity={0.55}
        color={primary}
      />
    </>
  );
}

function HeroScene({ technologies = [], accent = "purple" }) {
  const theme = themeData.find((item) => item.id === accent) || themeData[3];
  return (
    <div className="hero-scene">
      <div className="hero-scene-glow" />

      <Canvas
        key={accent}
        camera={{ position: [0, 0, 7], fov: 50 }}
        // A capped pixel ratio avoids mobile GPU overload while keeping the
        // scene crisp on high-density screens.
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power"
        }}
        fallback={<div className="hero-scene-fallback" aria-hidden="true" />}
      >
        <SceneContent
          technologies={technologies}
          primary={theme.primary}
          secondary={theme.secondary}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
    </div>
  );
}

export default HeroScene;
