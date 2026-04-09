import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mesa dos filósofos",
  description: "Atividade parcial de Sistemas Distribuídos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
