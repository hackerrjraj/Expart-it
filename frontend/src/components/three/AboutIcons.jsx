import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// Idle rotation + bob run always; hover ramps rotation speed and tilts the
// group toward the pointer, easing back down (damped, not a snap) on leave.
function useIdleHoverMotion(groupRef, { idleSpeed = 0.25, hoverBoost = 1.6, bobAmplitude = 0.08, tiltAmount = 0.26, reducedMotion = false }) {
  const hoverTarget = useRef(0);
  const hoverStrength = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  const handlers = useMemo(
    () => ({
      onPointerOver: () => {
        if (!reducedMotion) hoverTarget.current = 1;
      },
      onPointerOut: () => {
        hoverTarget.current = 0;
      },
      onPointerMove: (e) => {
        if (reducedMotion) return;
        pointer.current = { x: e.pointer?.x ?? 0, y: e.pointer?.y ?? 0 };
      },
    }),
    [reducedMotion]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    hoverStrength.current += (hoverTarget.current - hoverStrength.current) * Math.min(delta * 4, 1);
    const speed = idleSpeed * (1 + hoverStrength.current * hoverBoost);
    group.rotation.y += speed * delta;

    const bob = reducedMotion ? 0 : bobAmplitude;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.9) * bob;

    const targetTiltX = -pointer.current.y * tiltAmount * hoverStrength.current;
    const targetTiltZ = pointer.current.x * tiltAmount * hoverStrength.current;
    group.rotation.x += (targetTiltX - group.rotation.x) * Math.min(delta * 5, 1);
    group.rotation.z += (targetTiltZ - group.rotation.z) * Math.min(delta * 5, 1);
  });

  return handlers;
}

function ChromeSpring({ reducedMotion }) {
  const groupRef = useRef(null);
  const handlers = useIdleHoverMotion(groupRef, {
    idleSpeed: 0.35,
    hoverBoost: 1.8,
    bobAmplitude: 0.05,
    tiltAmount: 0.22,
    reducedMotion,
  });

  const geometry = useMemo(() => {
    const turns = 5;
    const pointsPerTurn = 24;
    const total = turns * pointsPerTurn;
    const radius = 0.55;
    const height = 2.1;
    const points = [];
    for (let i = 0; i <= total; i++) {
      const t = i / total;
      const angle = t * turns * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, (t - 0.5) * height, Math.sin(angle) * radius));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
    return new THREE.TubeGeometry(curve, 400, 0.09, 12, false);
  }, []);

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0.15]} scale={0.95} {...handlers}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#d9dde3" metalness={1} roughness={0.15} envMapIntensity={1.4} />
      </mesh>
    </group>
  );
}

export function ChromeSpringCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Environment preset="studio" />
      <ChromeSpring reducedMotion={reducedMotion} />
    </Canvas>
  );
}
