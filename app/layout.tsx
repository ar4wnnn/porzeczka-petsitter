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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add Bootstrap CSS directly from CDN as a fallback */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        {/* Add Nunito Sans font from Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        {/* Custom styles */}
        <style dangerouslySetInnerHTML={{ 
          __html: `
            body {
              font-family: 'Nunito Sans', sans-serif;
              padding-top: 5rem;
              background-color: #FFF9F9;
              color: #4E342E;
            }
            .navbar {
              background-color: white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .card {
              border-radius: 1rem;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              transition: transform 0.3s ease;
            }
            .card:hover {
              transform: translateY(-5px);
            }
            .btn-primary {
              background-color: #E57373;
              border-color: #E57373;
            }
            .btn-secondary {
              background-color: #81C784;
              border-color: #81C784;
            }
          ` 
        }} />
      </head>
      <body className={nunitoSans.className}>
        {children}
      </body>
    </html>
  );
}
