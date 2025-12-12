"use client";
import { useEffect } from "react";

export default function EmojiFall() {
  useEffect(() => {
    const emojis: string[] = ["🎄", "⭐", "🎁", "❄️", "🔔"];

    for (let i = 0; i < 20; i++) {
      const span = document.createElement("span");
      span.className = "emoji";
      span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = `${Math.random() * 100}vw`;
      span.style.animationDuration = `${3 + Math.random() * 5}s`;
      document.body.appendChild(span);
    }
  }, []);

  return null;
}
