import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useFrame } from "@react-three/fiber";
import GlassButton from "../components/GlassButton";
import "../components/GlassButton.css";
import StatsDisplay from "../components/StatsDisplay";
import AuthForm from "../components/auth/AuthForm";
import useAuth from "../hooks/useAuth";
import { Sun, Moon } from "phosphor-react";


// مدل سه‌بعدی Wall-E
function WallEModel(props) {
  const { scene } = useGLTF("/models/wall_e.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003; // کمی چرخش نرم‌تر از اوا
      const baseY = -1.5;
      ref.current.position.set(
        0,
        Math.sin(state.clock.elapsedTime) * 0.15 + baseY, // حالت معلق نرم‌تر
        0
      );
    }
  });

  return <primitive ref={ref} object={scene} scale={2.5} {...props} />;
}
// تایپ فارسی با تایپ‌رایتر
function TypewriterText() {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("آینده‌ات رو انتخاب کن!")
          .pauseFor(2000)
          .deleteAll()
          .typeString("ادامه تحصیل یا بازار کار؟")
          .pauseFor(2000)
          .deleteAll()
          .typeString("چند کلیک تا کشف مسیرت!")
          .pauseFor(2000)
          .start();
      }}
    />
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { token, login, isLoggedIn } = useAuth();

  const [showAuthBox, setShowAuthBox] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);
  };

  const handleStartClick = () => {
    if (token) {
      navigate("/survey");
    } else {
      setShowAuthBox(true);
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen w-full 
        bg-gradient-to-br from-amber-400 via-blue-100 to-amber-500
        dark:bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-black dark:text-white 
        flex flex-col-reverse md:flex-row items-center px-6 md:px-20 py-12 gap-12 md:gap-24"
      >
        {/* ✅ دکمه دارک مود بالا چپ */}
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-600 dark:border-amber-500 
               bg-white/60 dark:bg-black/50 backdrop-blur hover:scale-105 transition"
            aria-label="تغییر تم"
          >
            {isDark ? (
              <Sun size={20} weight="fill" className="text-yellow-400" />
            ) : (
              <Moon size={20} weight="fill" className="text-slate-700" />
            )}
          </button>
        </div>

        {/* متن، دکمه، آمار */}
        <motion.div
          dir="rtl"
          className="w-full md:w-1/2 space-y-8 text-center md:text-right"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-800 dark:text-amber-500/90 tracking-tight min-h-[90px]">
            <TypewriterText />
          </h1>

          <motion.p
            className="text-base md:text-lg dark:text-amber-500/90 leading-relaxed max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            با چند سؤال ساده مشخص کن که ادامه تحصیل برات مناسبه یا ورود به بازار
            کار. فقط چند کلیک تا روشن شدن مسیرت فاصله داری.
          </motion.p>

          <motion.div
            className="flex flex-col items-center md:items-start gap-4 w-full max-w-xs"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <GlassButton
              text="شروع نظرسنجی"
              className="w-[250px] mx-35 bg-white/40 dark:bg-white/10 border text-gray-800 dark:text-amber-500 border-blue-200 dark:border-amber-500 hover:bg-blue-100 shadow-xl hover:shadow-blue-200 dark:hover:shadow-amber-500 dark:hover:bg-amber-400/10"
              rippleColor="bg-white/30"
              onClick={handleStartClick}
            />

            <div className="w-[300px] mx-28">
              <StatsDisplay />
            </div>
          </motion.div>
        </motion.div>

        {/* مدل سه‌بعدی */}
        <motion.div
          className="w-full md:w-1/2 h-[300px] md:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[3, 3, 3]} intensity={1.5} />
            <pointLight
              position={[-2, -2, 3]}
              intensity={90}
              color={isDark ? "gold" : "#ADF0FF"}
            />
            <Suspense fallback={null}>
              <WallEModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </motion.div>
      </div>

      {/* فرم احراز هویت در وسط صفحه */}
      {showAuthBox && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div className="relative  p-6 rounded-xl  w-full max-w-md">
            {/* فرم لاگین */}
            <AuthForm
              onClose={() => setShowAuthBox(false)}
              onLogin={(newToken) => {
                login(newToken);
                setShowAuthBox(false);
                navigate("/survey");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
