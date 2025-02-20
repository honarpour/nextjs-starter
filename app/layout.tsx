import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE_TITLE } from "@/constants";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Next.js Starter"
  },
  description: "A Next.js starter template",
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  openGraph: {
    title: SITE_TITLE,
    description: "A Next.js starter template",
    images: ['/og-image.png'], // Add an Open Graph image
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
