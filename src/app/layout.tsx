import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PR Roaster | Cyberpunk Terminal",
  description: "Get your pull requests roasted by the most elite terminal in the multiverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground font-mono">
        <div className="noise-bg" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
