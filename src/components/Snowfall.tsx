"use client";
import { useEffect } from "react";

export default function Snowfall() {
  useEffect(() => {
    const canvas = document.getElementById("snow") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flakes: {
      x: number;
      y: number;
      r: number;
      speed: number;
      drift: number;
      alpha: number;
    }[] = [];

    // Create flakes
    for (let i = 0; i < 200; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 1,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flakes.forEach((f) => {
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function move() {
      flakes.forEach((f) => {
        f.y += f.speed;
        f.x += Math.sin(f.y * 0.01) * f.drift; // smooth drifting

        if (f.y > canvas.height) {
          f.y = -5;
          f.x = Math.random() * canvas.width;
        }
      });
    }

    function animate() {
      draw();
      move();
      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      id="snow"
      className="fixed inset-0 z-0 pointer-events-none"
    ></canvas>
  );
}
