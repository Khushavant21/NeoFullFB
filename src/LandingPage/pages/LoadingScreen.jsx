import React, { useEffect, useRef, useState } from "react";
import "./styles/LoadingScreen.css";
import logoSrc from "../assets/neobank-logoo.png";

export default function SplashScreen({ headerLogoRef, onFinish }) {
  const [stage, setStage] = useState(1); // 1 → loading, 2 → welcome, 3 → fly, 4 → fade
  const logoRef = useRef(null);

  useEffect(() => {
    // Stage 1 → loading (2s), then show welcome
    const t1 = setTimeout(() => setStage(2), 2000);

    // Stage 2 → welcome (2s only), then fly
    const t2 = setTimeout(() => setStage(3), 4000);

    // Stage 3 → fly animation, then fade out
    const t3 = setTimeout(() => {
      setStage(4);
      if (onFinish) onFinish();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []); // ✅ run only once on mount

  // Trigger fly-to-header animation
  useEffect(() => {
    if (stage === 3) {
      const logoEl = logoRef.current;
      const headerEl = headerLogoRef?.current;

      if (logoEl && headerEl) {
        const lRect = logoEl.getBoundingClientRect();
        const hRect = headerEl.getBoundingClientRect();

        const translateX =
          hRect.left + hRect.width / 2 - (lRect.left + lRect.width / 2);
        const translateY =
          hRect.top + hRect.height / 2 - (lRect.top + lRect.height / 2);
        const scale = (hRect.width / lRect.width) * 0.9;

        logoEl.style.setProperty("--tx", `${translateX}px`);
        logoEl.style.setProperty("--ty", `${translateY}px`);
        logoEl.style.setProperty("--scale", scale);
        logoEl.classList.add("fly-to-header");
      }
    }
  }, [stage, headerLogoRef]);

  if (stage === 4) return null;

  return (
    <div className={`splash-screen ${stage === 3 ? "exit" : ""}`}>
      <img
        ref={logoRef}
        src={logoSrc}
        alt="NeoBank Logo"
        className="splash-logo"
      />

      {/* Stage 1: Loading */}
      {stage === 1 && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}

      {/* Stage 2: Welcome (only 2s, then disappears) */}
     {stage === 2 && (
  <div className="welcome-text">
    <h1>Welcome to NeoBank!</h1>
    <h2>NeoBank में आपका स्वागत है !</h2>
    {Array.from({ length: 12 }).map((_, i) => (
      <span
        key={i}
        className="bubble"
        style={{
          left: `${Math.random() * 100}%`,
          width: `${10 + Math.random() * 40}px`,
          height: `${10 + Math.random() * 40}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${6 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
)}

    </div>
  );
}
