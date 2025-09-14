import { useEffect, useState } from "react";

export default function StatsDisplay() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!BACKEND_URL) {
      console.error("❌ VITE_API_URL تعریف نشده است!");
      setError("آدرس بک‌اند تعریف نشده است.");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/landing-stats/`, {
          credentials: "include", // ارسال کوکی‌ها اگر نیاز باشد
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        console.log("📊 دریافت شد:", result);
        setData(result);
      } catch (err) {
        console.error("خطا در دریافت آمار:", err);
        setError(err.message || "خطا در ارتباط با سرور");
      }
    };

    fetchData();
  }, [BACKEND_URL]);

  return (
    <div className="mt-4 w-full max-w-md rounded-2xl p-4 backdrop-blur-md bg-white/30 dark:bg-white/10 shadow-lg border border-white/50 dark:border-white/20 text-gray-800 dark:text-amber-400">
      <h2 className="text-lg font-bold mb-2">📊 آمار کاربران</h2>
      {error && <p className="text-red-500">{error}</p>}
      {data ? (
        <>
          <p>
            👤 تعداد شرکت‌کننده‌ها:{" "}
            <span className="font-semibold">{data.total_participants}</span>
          </p>
          <p>
            🎓 محبوب‌ترین رشته:{" "}
            <span className="font-semibold">{data.most_popular_major}</span>
          </p>
        </>
      ) : (
        !error && <p>در حال بارگذاری...</p>
      )}
    </div>
  );
}
