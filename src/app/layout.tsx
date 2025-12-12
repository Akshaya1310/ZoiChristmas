import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christmas Celebration 2025",
  description: "Interactive Christmas Poster with Animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
