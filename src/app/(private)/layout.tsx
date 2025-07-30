'use client';

import Header from "@/components/header";
import ProtectedRoutesWrapper from "@/components/protectedRoutesWrapper";
import { PagesRoutes } from "@/models";
import { usePathname } from "next/navigation";

export default function PrivateRoutesLayout ({ children }: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const useHeader = pathname !== '/validate-email';

  const cardPageStyle = 'flex justify-center items-center flex-1';
  const pagesWithCenterCardStyle: string[] = [PagesRoutes.VALIDATE_EMAIL];
  const mainStyle = pagesWithCenterCardStyle.includes(pathname) ? cardPageStyle : '';

  return (
    <ProtectedRoutesWrapper>
      <div className="flex flex-col min-h-dvh">
        {useHeader && <Header />}
        <main className={`py-8 ${mainStyle}`}>
          {children}
        </main>
      </div>
    </ProtectedRoutesWrapper>
  );
}