import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/global.scss";
import "@/styles/tokens.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selene",
  description: "An assignment tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        { children }
      </body>
    </html>
  );
}