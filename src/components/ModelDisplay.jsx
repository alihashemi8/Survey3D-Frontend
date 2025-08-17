import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function ModelDisplay({ modelPath }) {
  if (!modelPath) {
    console.warn("❗️Model path is undefined!");
    return null;
  }

  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}
