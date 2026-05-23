import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopping Mall",
  description: "FastAPI and Next.js shopping mall storefront"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
