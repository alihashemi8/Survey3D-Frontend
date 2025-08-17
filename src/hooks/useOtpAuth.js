import { useState } from "react";

export default function useOtpAuth() {
  const [identifier, setIdentifier] = useState(""); // ایمیل یا موبایل
  const [code, setCode] = useState("");
  const [step, setStep] = useState("request"); // request, verify
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/request-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      if (!res.ok) throw new Error("خطا در ارسال OTP");
      setStep("verify");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "خطا در تأیید OTP");
      }
      const data = await res.json();
      return data.token; // توکن JWT یا توکنی که بک‌اند میده
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    identifier,
    setIdentifier,
    code,
    setCode,
    step,
    loading,
    error,
    requestOtp,
    verifyOtp,
  };
}
