import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Checklist",
  description: "Aplicação de checklist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={'antialiased'}>
        {children}
      </body>
    </html>
  );
}
