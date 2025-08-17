export default function ResultSummary({ answers }) {
  const keys = [
    "interests",
    "experience",
    "skills",
    "language",
    "plan",
    "goal",
    "priority",
  ];

  const titles = [
    "مرحله ۱: علایق فردی",
    "مرحله ۲: سطح مهارت",
    "مرحله ۳: مهارت‌ها",
    "مرحله ۴: زبان‌های برنامه‌نویسی",
    "مرحله ۵: برنامه آینده",
    "مرحله ۶: مدل کاری دلخواه",
    "مرحله ۷: اولویت‌ها",
  ];

  const formatAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return answer.length === 0 ? "—" : answer.map((a) => `• ${a}`).join("  ");
    }
    return answer || "—";
  };

  return (
    <div dir="rtl" className="w-full bg-white/40 dark:bg-white/10 border dark:border-amber-400 shadow-lg dark:shadow-md shadow-blue-300 dark:shadow-amber-300 border-gray-900/80 backdrop-blur-md rounded-xl p-4 md:p-6 text-sm md:text-base text-left space-y-4">
      {keys.map((key, index) => (
        <div key={key}>
          <h3 className="text-black dark:text-amber-300 text-right font-bold mb-1">
            {titles[index]}
          </h3>
          <p className="text-gray-900 dark:text-white/90 text-right">
            {formatAnswer(answers[key])}
          </p>
        </div>
      ))}
    </div>
  );
}
