'use client';

import { PagesRoutes } from "@/models";
import { redirect } from "next/navigation";

interface RedirectToOtherPageProps {
  text: string;
  page: PagesRoutes;
}

export default function RedirectToOtherPage ({
  text,
  page,
}: RedirectToOtherPageProps) {
  return (
    <p className="hover:font-bold hover:cursor-pointer" onClick={() => redirect(page)}>
      {text}
    </p>
  );
}