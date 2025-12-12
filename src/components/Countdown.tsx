"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const target = new Date("December 25, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTime("🎄 It's Christmas! 🎉");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTime(`${days}d ${hrs}h ${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-xl text-center mt-4 text-yellow-300">
      🎅 Christmas Countdown: {time}
    </div>
  );
}
