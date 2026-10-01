import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Techshift Technology",
  description: "Leading software solutions provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${saira.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
