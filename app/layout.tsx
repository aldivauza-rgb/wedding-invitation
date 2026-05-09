import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Kamu mendapat undangan...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-black min-h-screen flex justify-center items-start">
        <div className="w-full max-w-[430px] mx-auto relative">
          {children}
        </div>
      </body>
    </html>
  );
}
