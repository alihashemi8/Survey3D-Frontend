export function analyzePath(answers) {
  const {
    interests = [],
    skills = [],
    experience = [],
    language = [],
    priorities = [],
    plan = "",
    goal = [],
  } = answers;

  const score = {
    ai: 0,
    web: 0,
    game: 0,
    app: 0,
    network: 0,
    CHE: 0,
    hack: 0,
    teaching: 0,
    nothing: 0,
    skills: 0,
    work: 0,
    ir: 0,
    foreign: 0,
    freelancing: 0,
    company: 0,
    startup: 0,
    money: 0,
    study: 0,
  };

  // تبدیل ورودی‌ها به آرایه (اگر نبودند)
  const interestList = Array.isArray(interests) ? interests : [interests];
  const skillList = Array.isArray(skills) ? skills : [skills];
  const expList = Array.isArray(experience) ? experience : [experience];
  const languageList = Array.isArray(language) ? language : [language];
  const priorityList = Array.isArray(priorities) ? priorities : [priorities];
  const planList = Array.isArray(plan) ? plan : [plan];
  const goalList = Array.isArray(goal) ? goal : [goal];

  // محاسبه نمره برای مسیرها (کد اصلی خودت رو بذار اینجا)
  interestList.forEach((item) => {
    switch (item) {
      case "هوش مصنوعی و تحلیل داده":
        score.ai += 3;
        break;
      case "(UI/UX) طراحی وب و رابط کاربری":
        score.web += 3;
        break;
      case "سخت‌افزار و رباتیک":
        score.CHE += 3;
        break;
      case "امنیت سایبری و هک":
        score.hack += 3;
        break;
      case "(android/ios/windows)توسعه اپلیکیشن":
        score.app += 3;
        break;
      case "بازی‌سازی":
        score.game += 3;
        break;
      case "شبکه":
        score.network += 3;
        break;
      case "تدریس و پژوهش دانشگاهی":
        score.teaching += 3;
        break;
      case "نمی دونم":
        score.nothing++;
        break;
    }
  });

  // مشابه با مهارت‌ها، تجربه‌ها، زبان‌ها و بقیه...
  skillList.forEach((item) => {
    switch (item) {
      case "شروع نکردم":
        score.skills++;
        break;
      case "مبتدی":
        score.skills += 2;
        break;
      case "متوسط":
        score.skills += 3;
        break;
      case "پیشرفته":
        score.skills += 4;
        break;
    }
  });

  expList.forEach((item) => {
    switch (item) {
      case "":
        score.ai++;
        break;
      case "(UI/UX) طراحی وب و رابط کاربری":
        score.web++;
        break;
      case "سخت افزار و رباتیک":
        score.CHE++;
        break;
      case "امنیت سایبری و هک":
        score.hack++;
        break;
      case "(android/ios/windows)توسعه اپلیکیشن":
        score.app++;
        break;
      case "بازی سازی":
        score.game++;
        break;
      case "شبکه":
        score.network++;
        break;
      case "تدریس و پژوهش دانشگاهی":
        score.teaching++;
        break;
      case "تجربه‌ای ندارم":
        score.nothing++;
        break;
    }
  });

  languageList.forEach((item) => {
    switch (item) {
      case "C , C++":
        score.game++;
        score.app++;
        score.CHE++;
        score.ai++;
        break;
      case "Java":
        score.app += 2;
        score.ai++;
        break;
      case "JavaScript":
        score.web += 4;
        score.app += 2;
        score.game++;
        break;
      case "Python":
        score.ai += 3;
        score.web += 2;
        break;
      case "php":
        score.web += 3;
        break;
      case "C#":
        score.game += 3;
        score.app++;
        score.web += 2;
        break;
      case "Kotlin , Swift":
        score.app += 3;
        break;
      case "GO":
        score.CHE += 2;
        score.web++;
        break;
      case "HTML , CSS":
        score.web += 2;
        break;
      case "موارد دیگر":
        score.nothing++;
        break;
    }
  });

  goalList.forEach((item) => {
    switch (item) {
      case "پژوهشی":
        score.study++;
        break;
      case "فریلنسری":
        score.freelancing++;
        break;
      case "شرکت یا گروه":
        score.company++;
        break;
      case "ادامه تحصیل":
        score.study++;
        break;
      case "استارتاپ":
        score.startup++;
        break;
    }
  });

  priorityList.forEach((item) => {
    switch (item) {
      case "درآمد بالا":
        score.money++;
        break;
      case "یادگیری عمیق":
        score.study++;
        break;
      case "پایداری شغلی":
        score.work++;
        break;
      case "امکان مهاجرت":
        score.foreign++;
        break;
      case "آزادی و خلاقیت":
        score.freelancing++;
        break;
    }
  });

  planList.forEach((item) => {
    switch (item) {
      case "ورود سریع به بازار کار":
        score.work += 2;
        break;
      case "ادامه تحصیل در ایران":
        score.ir += 2;
        break;
      case "ادامه تحصیل در خارج از کشور":
        score.foreign += 2;
        break;
      case "کار و ادامه تحصیل در ایران":
        score.work++;
        score.ir++;
        break;
      case "کار و ادامه تحصیل در خارج":
        score.work++;
        score.foreign++;
        break;
    }
  });

  // تحلیل ترکیب علاقه و مهارت
  const interestsMatched = [];
  const skillsMatched = [];

  if (
    interestList.includes("هوش مصنوعی و تحلیل داده") &&
    skillList.includes("تحلیل داده")
  ) {
    interestsMatched.push("هوش مصنوعی و تحلیل داده");
    skillsMatched.push("تحلیل داده");
  }
  if (
    interestList.includes("(UI/UX) طراحی وب و رابط کاربری") &&
    skillList.includes("طراحی وب")
  ) {
    interestsMatched.push("(UI/UX) طراحی وب و رابط کاربری");
    skillsMatched.push("طراحی وب");
  }
  if (
    interestList.includes("امنیت سایبری و هک") &&
    skillList.includes("امنیت")
  ) {
    interestsMatched.push("امنیت سایبری و هک");
    skillsMatched.push("امنیت");
  }
  if (
    interestList.includes("(android/ios/windows)توسعه اپلیکیشن") &&
    skillList.includes("توسعه موبایل")
  ) {
    interestsMatched.push("(android/ios/windows)توسعه اپلیکیشن");
    skillsMatched.push("توسعه موبایل");
  }
  if (
    interestList.includes("بازی‌سازی") &&
    skillList.includes("ساخت بازی")
  ) {
    interestsMatched.push("بازی‌سازی");
    skillsMatched.push("ساخت بازی");
  }

  // تطابق زبان‌ها با مسیرها
  const languageMatch = {
    ai: languageList.filter((lang) => ["Python", "C , C++"].includes(lang)),
    web: languageList.filter((lang) =>
      ["JavaScript", "HTML , CSS", "php"].includes(lang)
    ),
    app: languageList.filter((lang) => ["Java", "Kotlin , Swift"].includes(lang)),
    game: languageList.filter((lang) => ["C#", "C , C++"].includes(lang)),
    hack: languageList.filter((lang) => ["Python", "C , C++"].includes(lang)),
  };

  // بررسی تضادها و نکات مهم
  const conflicts = [];
  if (
    interestList.includes("امنیت سایبری و هک") &&
    !skillList.includes("امنیت")
  ) {
    conflicts.push(
      "شما علاقه‌مند به امنیت سایبری هستید اما مهارت‌های امنیتی محدودی دارید. توصیه می‌شود مهارت‌های مرتبط را توسعه دهید."
    );
  }
  if (
    interestList.includes("(UI/UX) طراحی وب و رابط کاربری") &&
    !skillList.includes("طراحی وب")
  ) {
    conflicts.push(
      "شما به طراحی وب علاقه‌مندید اما مهارت طراحی وب ندارید. شرکت در دوره‌های مرتبط کمک‌کننده است."
    );
  }
  if (
    interestList.includes("هوش مصنوعی و تحلیل داده") &&
    !skillList.includes("تحلیل داده")
  ) {
    conflicts.push(
      "برای ورود به هوش مصنوعی، داشتن مهارت تحلیل داده بسیار مهم است."
    );
  }

  // تعیین مسیر اصلی و ۳ مسیر برتر
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const mainPath = sorted[0][0];
  const top3 = sorted.slice(0, 3).map(([field]) => field);

  return {
    mainPath,
    top3,
    scores: score,
    priorityList,
    goalList,
    planList,
    details: {
      interestsMatched,
      skillsMatched,
      languageMatch,
      conflicts,
    },
  };
}
