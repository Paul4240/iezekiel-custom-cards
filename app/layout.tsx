import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iezekiel Custom Cards",
  description: "Custom metal cards by Iezekiel Haley",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
