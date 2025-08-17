import { useEffect, useState } from "react";

export default function StatsDisplay() {
  const [data, setData] = useState(null);

useEffect(() => {
  fetch("https://survey-backend.liara.run/api/landing-stats/")
    .then(res => res.json())
    .then((result) => {
      console.log("📊 دریافت شد:", result);
      setData(result);
    })
    .catch(err => console.error("خطا در دریافت آمار", err));
}, []);


  return (
    <div className="mt-4 w-full max-w-md rounded-2xl p-4 backdrop-blur-md bg-white/30 dark:bg-white/10 shadow-lg border border-white/50 dark:border-white/20 text-gray-800 dark:text-amber-400">
      <h2 className="text-lg font-bold mb-2">📊 آمار کاربران</h2>
      {data ? (
        <>
          <p>👤 تعداد شرکت‌کننده‌ها: <span className="font-semibold">{data.total_participants}</span></p>
          <p>🎓 محبوب‌ترین رشته: <span className="font-semibold">{data.most_popular_major}</span></p>
        </>
      ) : (
        <p>در حال بارگذاری...</p>
      )}
    </div>
  );
}
