import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "K-Spec Performance Tuning | Elite ECU & DSG Calibration Laboratory",
  description: "South Africa's premium automotive performance calibration center. Custom ECU remapping, TCU/DSG tuning, and premium upgrades engineered for maximum power and reliability.",
  keywords: ["ECU remapping", "DSG tuning", "TCU tuning", "dyno tuning", "performance parts", "K-Spec Performance", "South Africa automotive performance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white font-sans antialiased selection:bg-[#E10600] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
