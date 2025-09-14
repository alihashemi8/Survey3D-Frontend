import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderOverlay from "../components/LoaderOverlay";
import GlassButton from "../components/GlassButton";
import { Sun, Moon } from "phosphor-react";


function PathDetails() {
  const location = useLocation();
  const answers = location.state?.answers;
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
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  const fetchAnalysis = async () => {
    if (!answers) return;

    setLoading(true);
    setError(null);

    try {
      console.log("🔍 در حال ارسال به بک‌اند:", answers);
      const response = await axios.post(`${API_URL}/api/chatgpt_analysis/`, { answers });
      console.log("✅ تحلیل دریافت شد:", response.data);
      setAnalysis(response.data);
    } catch (err) {
      setError(err.message || "خطا در دریافت داده");
    } finally {
      setLoading(false);
    }
  };

  fetchAnalysis();
}, [answers]);


if (loading) return <LoaderOverlay text="در حال دریافت تحلیل مسیر شغلی..." />;
  if (error) return <div className="p-6 text-red-400 text-center">خطا: {error}</div>;
  if (!analysis) return <div className="p-6 text-white text-center">تحلیلی دریافت نشد</div>;

  const renderList = (items, textColor = "text-white") => {
    if (!items || items.length === 0) return <p className="text-gray-400">موردی یافت نشد.</p>;
    return (
      <ul className={`list-disc list-inside ${textColor} space-y-1`}>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  };

  const renderTextOrList = (data) => {
    if (!data) return <p className="text-gray-400">موردی یافت نشد.</p>;
    if (Array.isArray(data)) return renderList(data);
    return <p>{data}</p>;
  };

  return (
<>
  {loading && <LoaderOverlay text="در حال دریافت تحلیل مسیر شغلی..." />}
  <div
    className="min-h-screen w-full from-amber-400 via-blue-100 to-amber-500
    bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-black
    text-gray-800 dark:text-white
    flex flex-col items-center justify-center
    p-6 gap-6 font-sans"
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

    {/* ✅ عنوان صفحه */}
    <h1 className="text-4xl font-extrabold mt-10 text-gray-900 dark:text-amber-400 mb-6 text-center w-full">
      تحلیل کامل مسیر شغلی
    </h1>

    {/* ✅ باکس‌های محتوایی */}
    <div className="flex flex-col gap-6 w-full max-w-screen-xl">

      {/* سمت راست - تحلیل کلی */}
      <section
        dir="rtl"
        className="bg-white/40 dark:bg-white/10 border dark:border-amber-400 border-gray-400 p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 w-full"
      >
        <h2 className="text-2xl text-black dark:text-amber-300 mb-4 flex items-center gap-2">
          🧠 تحلیل کلی
        </h2>
        <p className="leading-relaxed whitespace-pre-wrap ">
          {analysis.detailed_analysis || "موردی یافت نشد."}
        </p>
      </section>

      {/* سمت چپ - بقیه باکس‌ها */}
      <div className="flex flex-col gap-6 w-full">

        <section
          dir="rtl"
          className="bg-white/40 dark:bg-white/10 border p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 border-gray-400 dark:border-amber-400 w-full"
        >
          <h2 className="text-2xl text-black dark:text-amber-300 mb-4 flex items-center gap-2">
            📌 نقشه راه مهارتی
          </h2>
          {renderTextOrList(analysis.skill_roadmap)}
        </section>

        <section
          dir="rtl"
          className="bg-white/40 dark:bg-white/10 border p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 border-gray-400 dark:border-amber-400 space-y-6 w-full"
        >
          <div>
            <h2 className="text-2xl dark:text-green-500 text-green-700 mb-3 flex items-center gap-2">
              ✅ مزایا
            </h2>
            {renderList(
              analysis.pros_and_cons?.pros,
              "text-green-600 dark:text-green-400"
            )}
          </div>
          <div>
            <h2 className="text-2xl text-red-600 dark:text-red-500 mb-3 flex items-center gap-2">
              ⚠️ معایب
            </h2>
            {renderList(
              analysis.pros_and_cons?.cons,
              "text-red-500 dark:text-red-500"
            )}
          </div>
        </section>

        <section
          dir="rtl"
          className="bg-white/40 dark:bg-white/10 border p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 border-gray-400 dark:border-amber-400 w-full"
        >
          <h2 className="text-2xl text-black dark:text-amber-300 mb-4 flex items-center gap-2">
            📚 پیشنهادهای یادگیری
          </h2>
          {renderTextOrList(analysis.learning_suggestions)}
        </section>

      </div>
    </div>

    {/* دکمه پایان */}
    <GlassButton
      text="شروع دوباره"
      className="bg-white/40 dark:bg-white/10 border text-gray-800 dark:text-white/90 border-blue-200 dark:border-amber-400 hover:bg-white/5 shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 hover:shadow-blue-500 dark:hover:shadow-amber-500 dark:hover:bg-amber-400/10 mt-6"
      rippleColor="bg-white/30"
      onClick={() => navigate("/")}
    />
  </div>
</>

  );
}

export default PathDetails;
