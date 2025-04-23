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
      <body className={`${nunitoSans.className} pt-20 bg-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
