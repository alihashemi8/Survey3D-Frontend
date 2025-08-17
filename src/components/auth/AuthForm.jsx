import React, { useState } from "react";

export default function AuthForm({ onClose, onLogin }) {
  const [mode, setMode] = useState("login"); // login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint =
      mode === "login"
        ? "https://survey-backend.liara.run/api/login/"
        : "https://survey-backend.liara.run/api/register/";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setError(data.message || "خطا در ورود یا ثبت‌نام");
      }
    } catch (err) {
      setError("خطا در اتصال به سرور");
    }

    setLoading(false);
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-md mx-auto relative"
      dir="rtl"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-black dark:text-gray-300 text-2xl font-bold"
        aria-label="بستن فرم"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-amber-400">
        {mode === "login" ? "ورود به حساب" : "ثبت‌نام"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          required
        />

        {error && (
          <p className="text-red-600 mb-3 text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : mode === "login" ? "ورود" : "ثبت‌نام"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {mode === "login" ? "حساب ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="text-amber-600 hover:underline"
        >
          {mode === "login" ? "ثبت‌نام کنید" : "وارد شوید"}
        </button>
      </p>
    </div>
  );
}
