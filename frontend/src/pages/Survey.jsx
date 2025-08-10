import { useState, Suspense, useRef, useCallback ,useEffect  } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../components/GlassButton.css";
import { Sun, Moon } from "phosphor-react";

const models = ["laptop", "keyboard", "case", "computer", "laptop", "keyboard" , "case"];

const modelConfigs = {
  laptop: { scale: 1.7, position: [0, 0.2, 0] },
  keyboard: { scale: 0.8, position: [0, 0, 0] },
  case: { scale: 0.8, position: [0, -1.8, 0] },
  computer: { scale: 1.8, position: [0, 0.3, 0] },
};

function Model3D({ name }) {
  const { scene } = useGLTF(`/models/${name}.glb`);
  const ref = useRef();
  const config = modelConfigs[name] || { scale: 2.5, position: [0, -1.5, 0] };

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.position.y =
        Math.sin(state.clock.elapsedTime) * 0.2 + config.position[1];
    }
  });

  return <primitive ref={ref} object={scene} scale={config.scale} />;
}

const steps = [
  {
    title: "علاقه‌ات بیشتر به کدام حوزه‌هاست؟",
    type: "multiple",
    options: [
      "هوش مصنوعی و تحلیل داده",
      "(UI/UX) طراحی وب و رابط کاربری",
      "سخت‌افزار و رباتیک",
      "امنیت سایبری و هک",
      "(android/ios/windows)توسعه اپلیکیشن",
      "بازی‌سازی",
      "شبکه",
      "تدریس و پژوهش دانشگاهی",

    ],
    key: "interests",
  },
  {
    title: "سطح مهارت و تجربه‌ات در برنامه‌نویسی و کار مورد علاقه ات چقدره؟",
    type: "single",
    options: ["شروع نکردم", "مبتدی", "متوسط", "پیشرفته"],
    key: "experience",
  },
  {
    title: "چه مهارت‌هایی داری یا تا الان تجربه کردی؟",
    type: "multiple",
    options: [
      "طراحی وب",
      "تحلیل داده",
      "هوش مصنوعی",
      "امنیت",
      "توسعه موبایل",
      "ساخت بازی",
      "شبکه",
      "تجربه‌ای ندارم",
    ],
    key: "skills",
  },
  {
    title: "با کدام زبان برنامه نویسی یا نشانه گذاری بیشتر کار کردی؟",
    type: "multiple",
    options: [
      "C , C++",
      "Java",
      "JavaScript",
      "Python",
      "php",
      "C#",
      "Kotlin , Swift",
      "GO",
      "HTML , CSS",

    ],
    key: "language",
  },
  {
    title: "برنامه‌ات برای ادامه مسیر چیه؟",
    type: "single",
    options: [
      "ورود سریع به بازار کار",
      "ادامه تحصیل در ایران",
      "ادامه تحصیل در خارج از کشور",
      "کار و ادامه تحصیل در ایران",
      "کار و ادامه تحصیل در خارج",
    ],
    key: "plan",
  },
  {
    title: "چه مدل کاری برای آینده برات جذاب‌تره؟",
    type: "multiple",
    options: [
      "پژوهشی",
      "فریلنسری",
      "شرکت یا گروه",
      "ادامه تحصیل",
      "استارتاپ",
    ],
    key: "goal",
  },
  {
    title: "کدوم مورد برات اولویت بیشتری داره؟",
    type: "multiple",
    options: [
      "درآمد بالا",
      "یادگیری عمیق",
      "پایداری شغلی",
      "امکان مهاجرت",
      "آزادی و خلاقیت",
    ],
    key: "priority",
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

    // ✅ دارک مود: مدیریت وضعیت تم
    const [isDark, setIsDark] = useState(false);
  
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
  
      if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
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
  
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
  
      setIsDark(!isDark);
    };
  
  const current = steps[step];
  const modelName = models[step];
  const currentAnswer =
    answers[current.key] || (current.type === "multiple" ? [] : "");

  const toggleOption = useCallback(
    (option) => {
      if (current.type === "multiple") {
        const alreadySelected = currentAnswer.includes(option);
        let updated;

        // اگر گزینه "تجربه‌ای ندارم" انتخاب شده، همه گزینه‌ها غیر از اون حذف بشن
        if (option === "تجربه‌ای ندارم") {
          updated = alreadySelected ? [] : [option];
        } else {
          // اگه "تجربه‌ای ندارم" قبلا انتخاب شده بود، حذفش کنیم
          const withoutNoExperience = currentAnswer.filter(
            (item) => item !== "تجربه‌ای ندارم"
          );
          updated = alreadySelected
            ? withoutNoExperience.filter((item) => item !== option)
            : [...withoutNoExperience, option];
        }
        setAnswers({ ...answers, [current.key]: updated });
      } else {
        setAnswers({ ...answers, [current.key]: option });
      }
    },
    [answers, current.key, current.type, currentAnswer]
  );

  const handleNext = () => {
    const answer = answers[current.key];
    if (current.type === "multiple" && (!answer || answer.length === 0)) {
      alert("حداقل یک گزینه را انتخاب کن");
      return;
    }
    if (current.type === "single" && !answer) {
      alert("لطفاً یک گزینه انتخاب کن");
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));
      navigate("/result", { state: { answers } });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen w-full from-amber-400 via-blue-100 to-amber-500 
    bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-black text-gray-800 dark:text-white flex flex-col md:flex-row-reverse items-center justify-center p-6 gap-6 md:gap-10">
      {/* مدل سه‌بعدی */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <pointLight position={[-2, -2, 3]} intensity={60} color={isDark ? "gold" : "deepskyblue"} />
          <Suspense fallback={null}>
            <Model3D name={modelName} />
          </Suspense>
        </Canvas>
      </div>
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

      {/* فرم سوال */}
      <div className="w-full md:w-1/2 z-10 backdrop-blur-lg bg-white/20 dark:bg-white/5 border border-gray-600/80 dark:border-amber-500/60 rounded-xl p-6 md:p-10 md:mt-10 shadow-2xl space-y-6">
        <div className="flex justify-between items-center mb-2">
                      <span className="text-2xs  text-black dark:text-gray-400">
    {current.type === "multiple" ? "چند انتخابی" : "تک انتخابی"}
  </span>
          <span className="text-xs text-black dark:text-gray-400">
            سؤال {step + 1} از {steps.length}
          </span>
 
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-right">
          {current.title}
        </h2>

        <div className="space-y-4">
          {current.options.map((opt) => {
            const selected =
              current.type === "multiple"
                ? currentAnswer.includes(opt)
                : currentAnswer === opt;

            return (
<button
  key={opt}
  onClick={() => toggleOption(opt)}
  className={`option-button border transition 
    ${selected
      ? 'bg-black/70 dark:bg-amber-500/90 text-gray-100 dark:text-black font-semibold border border-blue-400 dark:border-amber-500 shadow-lg shadow-blue-400 dark:shadow-gray-400 '
      : 'bg-white/5 dark:bg-white/10 text-gray-800 dark:text-white border border-gray-600 dark:border-amber-400/50 hover:bg-gray-500/80 hover:border-blue-500 dark:hover:border-amber-500 dark:hover:bg-amber-400/10 shadow-lg hover:shadow-blue-300 dark:hover:shadow-amber-500 '}
  `}
>
  {opt}
</button>

            );
          })}
        </div>

        <div className="flex justify-between pt-6">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 dark:bg-white/10 border border-gray-600 dark:border-amber-500/60 text-gray-800 dark:text-white 
               hover:bg-gray-500/80 hover:border-blue-500 dark:hover:border-amber-500 hover:shadow-blue-300 dark:hover:shadow-amber-500  rounded-lg hover:scale-105 transition font-medium shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              بازگشت
            </button>
          ) : (
            <span />
          )}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 dark:bg-white/10 hover:bg-gray-500/80 hover:border-blue-500 dark:hover:border-amber-500 border border-gray-600 dark:border-amber-500/60 text-gray-800 dark:text-white rounded-lg hover:scale-105 transition font-medium
             shadow-md hover:shadow-blue-400 dark:hover:shadow-amber-500 "
          >
            {step === steps.length - 1 ? "مشاهده نتیجه" : "ادامه"}
          </button>
        </div>
      </div>
    </div>
  );
}
