import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Porzeczka Petsitter - Your Pet's Best Friend",
  description: "Professional pet sitting services with love and care for your furry friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunitoSans.variable} font-nunito antialiased pt-32`}
      >
        {children}
      </body>
    </html>
  );
}
