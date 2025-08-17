import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function EvaModel() {
  const { scene } = useGLTF("/models/eva.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 0.5;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1}
    />
  );
}
