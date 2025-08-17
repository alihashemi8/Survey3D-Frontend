import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

function LogoObject() {
  const { scene } = useGLTF("/models/Logo.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={0.02} position={[0, -2, 0]} />
  );
}

export default function LogoModel() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} />
      <pointLight position={[-2, -2, 3]} intensity={50} color={"#ADF0FF"} />
      <Suspense fallback={null}>
        <LogoObject />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
