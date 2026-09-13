"use client";

import React, { useEffect, useRef, useState } from "react";

interface Drop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  alpha: number;
  layer: "bg" | "mid" | "fg";
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
}

export const RainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightningFlash, setLightningFlash] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = width < 768;
    const bgCount = isMobile ? 45 : 95;
    const midCount = isMobile ? 30 : 65;
    const fgCount = isMobile ? 8 : 22;

    const drops: Drop[] = [];
    const splashes: Splash[] = [];

    // Initialize Background Rain Layer (fine, dim, slow)
    for (let i = 0; i < bgCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.6 + Math.random() * 0.4,
        vy: 11 + Math.random() * 5,
        length: 10 + Math.random() * 8,
        width: 0.75,
        alpha: 0.12 + Math.random() * 0.1,
        layer: "bg",
      });
    }

    // Initialize Midground Rain Layer (medium)
    for (let i = 0; i < midCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 1.0 + Math.random() * 0.6,
        vy: 18 + Math.random() * 7,
        length: 18 + Math.random() * 12,
        width: 1.15,
        alpha: 0.25 + Math.random() * 0.15,
        layer: "mid",
      });
    }

    // Initialize Foreground Rain Layer (occasional larger, faster storm streaks)
    for (let i = 0; i < fgCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 1.4 + Math.random() * 0.8,
        vy: 28 + Math.random() * 10,
        length: 34 + Math.random() * 18,
        width: 1.6,
        alpha: 0.45 + Math.random() * 0.2,
        layer: "fg",
      });
    }

    // --- Natural Lightning State Machine ---
    let currentLightning = 0; // 0 to 1
    let targetLightning = 0;
    let lightningTimer: ReturnType<typeof setTimeout>;

    const triggerLightningSequence = () => {
      if (prefersReducedMotion) return;

      // Stage 1: Subtle initial flash
      currentLightning = 0.28;
      document.documentElement.style.setProperty("--lightning-flash", "0.28");
      setLightningFlash(0.28);

      // Stage 2: Brief dip
      setTimeout(() => {
        currentLightning = 0.05;
        document.documentElement.style.setProperty("--lightning-flash", "0.05");
        setLightningFlash(0.05);
      }, 55);

      // Stage 3: Sharper main strike
      setTimeout(() => {
        currentLightning = 0.78;
        document.documentElement.style.setProperty("--lightning-flash", "0.78");
        setLightningFlash(0.78);
      }, 105);

      // Stage 4: Smooth diffuse decay
      setTimeout(() => {
        targetLightning = 0;
      }, 210);

      // Schedule next random atmospheric lightning (between 4.2s and 6.4s)
      const nextDelay = 4200 + Math.random() * 2200;
      lightningTimer = setTimeout(triggerLightningSequence, nextDelay);
    };

    // Initial lightning start after 3.5s
    lightningTimer = setTimeout(triggerLightningSequence, 3500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // --- Render Loop ---
    const render = () => {
      // Smooth decay of lightning
      if (currentLightning > 0.005) {
        currentLightning += (targetLightning - currentLightning) * 0.12;
        document.documentElement.style.setProperty(
          "--lightning-flash",
          currentLightning.toFixed(3)
        );
      } else {
        currentLightning = 0;
        document.documentElement.style.setProperty("--lightning-flash", "0");
      }

      // Base Pitch-Black background (#030303)
      // When lightning occurs, background gently elevates to deep atmospheric slate/charcoal
      if (currentLightning > 0.01) {
        const r = Math.round(3 + currentLightning * 24);
        const g = Math.round(3 + currentLightning * 26);
        const b = Math.round(3 + currentLightning * 32);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      } else {
        ctx.fillStyle = "#030303";
      }
      ctx.fillRect(0, 0, width, height);

      // Diffuse Sky Lightning Flash (directional atmospheric sky sheet)
      if (currentLightning > 0.02) {
        const skyGlow = ctx.createLinearGradient(0, 0, 0, height * 0.6);
        skyGlow.addColorStop(0, `rgba(215, 230, 255, ${currentLightning * 0.22})`);
        skyGlow.addColorStop(0.5, `rgba(180, 205, 240, ${currentLightning * 0.08})`);
        skyGlow.addColorStop(1, "rgba(3, 3, 3, 0)");
        ctx.fillStyle = skyGlow;
        ctx.fillRect(0, 0, width, height * 0.6);
      }

      // Draw and update rain drops
      ctx.lineCap = "round";

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // During lightning, raindrops catch light and become more visible
        const illuminationBoost = currentLightning * 0.45;
        const finalAlpha = Math.min(d.alpha + illuminationBoost, 0.95);

        ctx.lineWidth = d.width;
        ctx.strokeStyle = `rgba(225, 238, 255, ${finalAlpha})`;

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.vx * 1.5, d.y - d.length);
        ctx.stroke();

        if (!prefersReducedMotion) {
          d.x += d.vx;
          d.y += d.vy;

          // Impact with bottom creates subtle splash for foreground drops
          if (d.y >= height) {
            if (d.layer === "fg" && Math.random() < 0.35 && splashes.length < 30) {
              splashes.push({
                x: d.x,
                y: height - 2,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 2.5 - 1,
                radius: 1 + Math.random(),
                alpha: 0.45,
                life: 1,
              });
            }

            d.y = -d.length - Math.random() * 40;
            d.x = Math.random() * (width + 100) - 50;
          }

          if (d.x > width + 40) {
            d.x = -20;
          }
        }
      }

      // Update and draw splashes
      if (!prefersReducedMotion) {
        for (let i = splashes.length - 1; i >= 0; i--) {
          const s = splashes[i];
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 235, 255, ${s.alpha * s.life})`;
          ctx.fill();

          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.18; // gravity
          s.life -= 0.06;

          if (s.life <= 0) {
            splashes.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(lightningTimer);
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.setProperty("--lightning-flash", "0");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default RainBackground;
