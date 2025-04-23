import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porzeczka Petsitter | Professional Pet Sitting Services",
  description: "Professional pet sitting services in your area. We provide dog walking, cat sitting, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Fallback for Tailwind CSS if it doesn't load properly in production */}
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className={`${nunitoSans.className} pt-20 bg-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
