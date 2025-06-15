import type { Metadata } from "next";

import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import DefaultMenubar from "@/components/defaultNavbar";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container min-h-screen max-w-3xl w-full py-10 mx-auto">
          <div className="flex flex-col">
            <DefaultMenubar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
