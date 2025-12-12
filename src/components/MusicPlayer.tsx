"use client";

export default function MusicPlayer() {
  return (
    <audio autoPlay loop>
      <source src="/music.mp3" type="audio/mpeg" />
    </audio>
  );
}
