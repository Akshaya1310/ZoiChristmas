import "./globals.css";

export const metadata = {
  title: "Christmas Celebration 2025",
  description: "Interactive Christmas Poster with Animations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
