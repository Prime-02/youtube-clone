"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import Topbar from "./components/ui/Topbar";
import Sidebar from "./components/ui/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <Topbar onMenuClick={() => setSidebarCollapsed((v) => !v)} />
        <div className="flex pt-14">
          <Sidebar collapsed={sidebarCollapsed} />
          <main
            className="flex-1 min-w-0 transition-all duration-200"
            style={{ marginLeft: sidebarCollapsed ? "4rem" : "15rem" }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
