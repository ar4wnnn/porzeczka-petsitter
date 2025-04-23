import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "600", "700", "800", "900"],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${nunitoSans.className} antialiased pt-32`}>
        {children}
      </body>
    </html>
  );
}
