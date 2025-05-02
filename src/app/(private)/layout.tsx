'use client';

import Header from "@/components/header";
import ProtectedRoutesWrapper from "@/components/protectedRoutesWrapper";
import { usePathname } from "next/navigation";

export default function PrivateRoutesLayout ({ children }: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const useHeader = pathname !== '/validate-email';

  return (
    <ProtectedRoutesWrapper>
      <div className="flex flex-col min-h-dvh">
        {useHeader && <Header />}
        <main className="flex justify-center items-center flex-1">
          {children}
        </main>
      </div>
    </ProtectedRoutesWrapper>
  );
}