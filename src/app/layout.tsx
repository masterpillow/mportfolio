import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Maximilian Musial | Cybersecurity Portfolio",
    template: "%s | Max Musial",
  },
  description:
    "Cybersecurity student specializing in penetration testing and offensive security. Hands-on projects, CTF write-ups, and security research.",
  keywords: ["cybersecurity","penetration testing","offensive security","CTF","portfolio"],
  authors: [{ name: "Maximilian Musial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Maximilian Musial Portfolio",
    title: "Maximilian Musial | Cybersecurity Portfolio",
    description: "Cybersecurity student specializing in penetration testing and offensive security.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0D1117", color: "#E6EDF3", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
