import type { Metadata } from "next";
import { KeinRadAufZahlen } from "@/components/ui/KeinRadAufZahlen";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Coding Starter Kit",
  description: "Built with AI Agent Team System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <KeinRadAufZahlen />
        {children}
      </body>
    </html>
  );
}
