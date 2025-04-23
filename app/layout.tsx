import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
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
        {/* Google Fonts - Nunito Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Fallback for Tailwind CSS */}
        <link rel="stylesheet" href="/styles.css" />
        
        {/* Additional styles for better compatibility */}
        <style>
          {`
            body {
              font-family: 'Nunito Sans', sans-serif;
              padding-top: 5rem;
              background-color: white;
              color: #4E342E;
              margin: 0;
            }
            
            *, *::before, *::after {
              box-sizing: border-box;
            }
          `}
        </style>
      </head>
      <body className={nunitoSans.className}>
        {children}
      </body>
    </html>
  );
}
