import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {/* <Header /> */}
      {children}
    </div>
  )
}