'use client';

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header () {
  const pathname = usePathname();
  const router = useRouter();

  const pagesInfos = [
    { label: 'Perfil', route: '/profile' },
    { label: 'Grupos de itens', route: '/items-groups' },
  ];

  const actualPage = pagesInfos.find((page) => page.route === pathname)?.label;
  const pageShortcut = pagesInfos.map((page) => page.label);
  
  const pageSelectedStyle = (page: string) => page === actualPage ? 'font-bold underline underline-offset-8' : ''

  return (
    <header className="bg-(--border)">
      <div className="flex max-w-7xl m-auto px-16 py-4 gap-4">
        {pageShortcut.map((page) => {
          return (
            <div
              className={`cursor-pointer ${pageSelectedStyle(page)}`}
              key={page}
              onClick={() => {
                router.push(pagesInfos.find((pageInfo) => pageInfo.label === page).route)
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
    </header>
  );
}