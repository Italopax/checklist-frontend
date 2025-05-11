'use client';

import { PagesRoutes } from "@/models";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Button from "./button";
import { Storage } from "@/utils/storage";

export default function Header () {
  const pathname = usePathname();
  const router = useRouter();

  const pagesInfos = [
    { label: 'Perfil', route: PagesRoutes.PROFILE },
    { label: 'Grupos de itens', route: PagesRoutes.ITEMS_GROUPS },
  ];

  const actualPage = pagesInfos.find((page) => page.route === pathname)?.label;
  const pageShortcut = pagesInfos.map((page) => page.label);
  
  const pageSelectedStyle = (page: string) => page === actualPage ? 'font-bold underline underline-offset-8' : '';

  function logout (): void {
    Storage.removeCookies(['accessToken', 'refreshToken']);
    router.push(PagesRoutes.LOGIN);
  }

  return (
    <header className="bg-(--border)">
      <div className="flex max-w-7xl m-auto px-16 py-4 gap-4 justify-between items-center">
        <div className="flex gap-4">
          {pageShortcut.map((page) => {
            return (
              <a
                key={page}
                className={`cursor-pointer ${pageSelectedStyle(page)}`}
                onClick={() => {
                  router.push(pagesInfos.find((pageInfo) => pageInfo.label === page).route)
                }}
              >
                {page}
              </a>
            );
          })}
        </div>
        <Button
          text="Logout"
          type="button"
          onClick={logout}
        />
      </div>
    </header>
  );
}