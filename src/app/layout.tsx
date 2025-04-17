import type { Metadata } from "next";
import "../styles/globals.css";
import { GlobalContextProvider } from "@/context/globalContext";

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
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
