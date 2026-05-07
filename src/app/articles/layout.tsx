import { Inter, JetBrains_Mono } from "next/font/google";
import "./articles.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--portfolio-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--portfolio-mono",
  display: "swap",
});

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`articles-shell ${inter.variable} ${jetbrainsMono.variable}`}>{children}</div>
  );
}
