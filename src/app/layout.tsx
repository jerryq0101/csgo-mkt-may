import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import { fonts } from './fonts'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSGO Quick Item Query",
  description: "Created using Next.js, Tailwind, MongoDB and an EC2 instance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
        <body className={inter.className}>
              <Providers>
                {children}
              </Providers>
        </body>
    </html>
  );
}
