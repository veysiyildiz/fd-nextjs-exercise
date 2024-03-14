import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/molecules";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fashion Collection",
  description: "The best fashion collection on the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen sm:p-24 py-24 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
