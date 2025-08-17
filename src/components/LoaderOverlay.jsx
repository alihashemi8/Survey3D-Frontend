import React from "react";

function LoaderOverlay({ text = "در حال بارگذاری..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30 dark:bg-black/50">
      <div className="flex flex-col items-center space-y-4 p-6 bg-white/70 dark:bg-gray-900/70 border border-gray-300 dark:border-amber-500 rounded-xl shadow-lg">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-800 dark:text-white text-lg font-semibold">{text}</p>
      </div>
    </div>
  );
}

export default LoaderOverlay;
