// src/utils/getAdvancedSummary.js

const roadmap = {
  ai: {
    faTitle: "هوش مصنوعی",
    why:
      "علاقه و مهارت‌های شما در زمینه هوش مصنوعی، شما را برای ورود به دنیای یادگیری ماشین، NLP و بینایی ماشین آماده می‌کند.",
    suggestion:
      "دوره‌های پیشرفته هوش مصنوعی، مشارکت در پروژه‌های متن‌باز، و همکاری با تیم‌های تحقیقاتی را آغاز کنید.",
    next:
      "مطالعه پایتون، TensorFlow، PyTorch، و شرکت در چالش‌های Kaggle توصیه می‌شود.",
    tools: ["Python", "TensorFlow", "PyTorch", "Kaggle", "Pandas"],
  },
  web: {
    faTitle: "توسعه وب",
    why:
      "تمایل و تجربه شما در زمینه طراحی سایت، شما را به یک توسعه‌دهنده وب حرفه‌ای تبدیل می‌کند.",
    suggestion:
      "فریم‌ورک‌های محبوب مثل React، Next.js و مهارت‌های بک‌اند (Node.js, Django) را تقویت کنید.",
    next: "در پروژه‌های واقعی و فریلنسری مشارکت کنید و نمونه‌کار حرفه‌ای بسازید.",
    tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
  },
  game: {
    faTitle: "توسعه بازی",
    why:
      "گرایش شما به بازی‌سازی نشان می‌دهد که خلاقیت و علاقه به طراحی تعاملی دارید.",
    suggestion:
      "Unreal Engine یا Unity را یاد بگیرید و پروژه‌های ساده‌ی بازی‌سازی را شروع کنید.",
    next: "روی ساخت بازی‌های کوچک و پیوستن به تیم‌های مستقل تمرکز کنید.",
    tools: ["Unity", "C#", "Unreal", "Blender"],
  },
  app: {
    faTitle: "توسعه اپلیکیشن",
    why:
      "علاقه‌مندی شما به ساخت اپلیکیشن‌ها، مسیر توسعه اپ را برایتان مناسب می‌کند.",
    suggestion:
      "یادگیری Flutter یا React Native را شروع کرده و اپ‌های کوچک بسازید.",
    next: "اپ‌هایی با حل یک مشکل واقعی طراحی و در مارکت‌ها منتشر کنید.",
    tools: ["Flutter", "Dart", "React Native", "Firebase"],
  },
  hack: {
    faTitle: "امنیت و هک اخلاقی",
    why:
      "گرایش شما به امنیت سایبری و تحلیل سیستم‌ها مسیر هک اخلاقی را مناسب می‌سازد.",
    suggestion:
      "با شبکه و مفاهیم اولیه امنیت شروع کنید، سپس وارد دنیای CEH و ابزارهای پیشرفته شوید.",
    next:
      "CTF حل کنید، در Hack The Box تمرین کنید و مدارک OSCP یا CEH را دریافت کنید.",
    tools: ["Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap"],
  },
};

export function getAdvancedSummary({
  mainPath,
  top3,
  priorityList,
  goalList,
  planList,
  details,
  scores = {},
}) {
  if (!mainPath || !roadmap[mainPath]) {
    return [
      {
        title: "❗ خطا در تحلیل مسیر",
        content: "پاسخ‌های شما به درستی پردازش نشدند. لطفاً فرم را دوباره بررسی کنید.",
      },
    ];
  }

  const summary = [];

  // مسیر اصلی
  const main = roadmap[mainPath];
  summary.push({
    type: "mainPath",
    title: `🎯 مسیر اصلی پیشنهادی: ${main.faTitle}`,
    content: main.why,
    suggestion: main.suggestion,
    next: main.next,
    tools: main.tools,
    score: scores[mainPath] || null,
  });

  // مسیرهای جایگزین
  const altPaths = top3.filter((p) => p !== mainPath).slice(0, 2);
  altPaths.forEach((path) => {
    if (roadmap[path]) {
      summary.push({
        type: "altPath",
        title: `🔄 مسیر جایگزین: ${roadmap[path].faTitle}`,
        content: roadmap[path].why,
        suggestion: roadmap[path].suggestion,
        next: roadmap[path].next,
        tools: roadmap[path].tools,
        score: scores[path] || null,
      });
    }
  });

  // تطابق علاقه و مهارت
  if (details?.interestsMatched?.length && details?.skillsMatched?.length) {
    summary.push({
      type: "match",
      title: "💡 تطابق علاقه‌ها و مهارت‌های شما:",
      content: `شما علاقه‌مند به حوزه‌های ${details.interestsMatched.join("، ")} هستید و مهارت‌های مرتبط ${details.skillsMatched.join("، ")} را نیز دارید که این نقطه قوت مسیر شماست.`,
    });
  }

  // زبان‌ها
  if (details?.languageMatch) {
    Object.entries(details.languageMatch).forEach(([key, langs]) => {
      if (langs.length > 0 && roadmap[key]) {
        summary.push({
          type: "language",
          title: `🧠 زبان‌های برنامه‌نویسی مفید برای مسیر ${roadmap[key].faTitle}:`,
          content: `شما با زبان‌های ${langs.join("، ")} آشنا هستید که در مسیر ${roadmap[key].faTitle} بسیار کاربردی هستند.`,
        });
      }
    });
  }

  // هشدارها / تضادها
  if (details?.conflicts?.length > 0) {
    summary.push({
      type: "conflict",
      title: "⚠️ نکات مهم و هشدارها:",
      content: details.conflicts.join(" "),
    });
  }

  // اولویت‌ها
  if (priorityList?.length > 0) {
    summary.push({
      type: "priority",
      title: "📌 اولویت‌های شما:",
      content: `براساس اولویت‌های مشخص‌شده (${priorityList.join("، ")})، مسیر انتخابی با شرایط شما سازگاری دارد.`,
    });
  }

  // اهداف شخصی
  if (goalList?.length > 0) {
    if (goalList.includes("فریلنسری")) {
      summary.push({
        type: "goal",
        title: "🧑‍💻 علاقه به فریلنسری:",
        content: "مسیرهایی مثل Web یا App با تمرکز بر بازار بین‌المللی برای شما مناسب‌تر است.",
      });
    }
    if (goalList.includes("پژوهشی") || goalList.includes("ادامه تحصیل")) {
      summary.push({
        type: "goal",
        title: "📚 گرایش به پژوهش یا ادامه تحصیل:",
        content: "مسیرهایی مثل AI یا Game فرصت‌های خوبی برای ادامه تحصیل فراهم می‌کنند.",
      });
    }
    if (goalList.includes("استارتاپ")) {
      summary.push({
        type: "goal",
        title: "🚀 علاقه به راه‌اندازی استارتاپ:",
        content: "یادگیری چندمهارت و مدیریت پروژه می‌تواند شما را در مسیر استارتاپ موفق کند.",
      });
    }
  }

  // برنامه‌ها
  if (planList?.length > 0) {
    if (planList.includes("ادامه تحصیل در خارج از کشور") || planList.includes("کار و ادامه تحصیل در خارج")) {
      summary.push({
        type: "plan",
        title: "🌍 مهاجرت یا تحصیل خارج:",
        content: "برای مهاجرت و ادامه تحصیل در خارج، مهارت زبان و مدرک‌های بین‌المللی اهمیت دارد.",
      });
    }
    if (planList.includes("ورود سریع به بازار کار") || planList.includes("کار و ادامه تحصیل در ایران")) {
      summary.push({
        type: "plan",
        title: "🇮🇷 تمرکز بر بازار ایران:",
        content: "تمرکز بر پروژه‌های واقعی و شبکه‌سازی محلی می‌تواند سریع‌تر شما را وارد بازار کند.",
      });
    }
  }

  return summary;
}
