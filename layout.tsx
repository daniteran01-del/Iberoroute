import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iberoute",
  description: "Share your ride to IBERO, split the cost.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
