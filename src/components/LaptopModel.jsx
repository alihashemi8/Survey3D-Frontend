function LaptopModel() {
  const { scene } = useGLTF("/models/laptop.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 1.5;
    }
  });

  return <primitive ref={ref} object={scene} scale={2.5} />;
}
