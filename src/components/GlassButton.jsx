import { useState } from "react";
import "./GlassButton.css";

function GlassButton({ text = "شروع", onClick, className = "", textClass = "", rippleColor = "bg-white/30" }) {
  const [ripples, setRipples] = useState([]);

  const createRipple = () => {
    const id = Date.now();
    setRipples((prev) => [...prev, id]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id));
    }, 600);
  };

  const handleClick = (e) => {
    createRipple();
    if (onClick) onClick(e);
  };

  return (
    <button className={`glass-button ${className}`} onClick={handleClick}>
      <span className={`text ${textClass}`}>{text}</span>
      {ripples.map((r) => (
        <span key={r} className={`wave ${rippleColor}`} />
      ))}
    </button>
  );
}

export default GlassButton;
