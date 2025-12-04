import type { Metadata } from "next";

import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import DefaultMenubar from "@/components/default-navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matt Lieber is",
  description: "Descriptions of Matt Lieber from the Reply All podcast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container flex flex-col h-screen max-w-3xl px-3 py-10 mx-auto items-start">
            <DefaultMenubar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
