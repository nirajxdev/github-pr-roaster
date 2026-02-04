import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PR Roaster | AI-Powered Code Review Roasting",
  description: "Get your pull requests brutally roasted by our AI code reviewer. Submit any GitHub PR and receive sarcastic but constructive feedback on your code.",
  keywords: ["code review", "pull request", "GitHub", "AI", "roast", "developer tools"],
  authors: [{ name: "PR Roaster" }],
  openGraph: {
    title: "PR Roaster | AI-Powered Code Review Roasting",
    description: "Get your pull requests brutally roasted by our AI code reviewer",
    type: "website",
  },
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
