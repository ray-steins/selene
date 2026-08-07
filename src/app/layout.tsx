import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader 
          color='var(--color-primary)'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={false}
        />
        { children }
      </body>
    </html>
  );
}