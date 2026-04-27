import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kolamate | Intelligent Proposal Assistant",
  description: "AI-powered proposal generator and job brief analyzer for freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
