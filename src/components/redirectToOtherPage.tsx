'use client';

import { PagesRoutes } from "@/models";
import { useRouter } from "next/navigation";

interface RedirectToOtherPageProps {
  text: string;
  page: PagesRoutes;
}

export default function RedirectToOtherPage ({
  text,
  page,
}: RedirectToOtherPageProps) {
  const router = useRouter();

  return (
    <p className="hover:font-bold hover:cursor-pointer" onClick={() => router.push(page)}>
      {text}
    </p>
  );
}