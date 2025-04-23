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
        <style>
          {`
            body {
              font-family: 'Nunito Sans', sans-serif;
              padding-top: 80px;
              background-color: #ffffff;
              color: #333333;
            }
            
            .navbar {
              background-color: white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .card {
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease;
            }
            
            .card:hover {
              transform: translateY(-5px);
            }
            
            .btn-primary {
              background-color: #FF6B6B;
              border-color: #FF6B6B;
            }
            
            .btn-secondary {
              background-color: #4ECDC4;
              border-color: #4ECDC4;
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
