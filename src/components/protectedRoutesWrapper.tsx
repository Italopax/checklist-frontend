'use client';

import { refershToken } from "@/actions/auth";
import { getMeData } from "@/actions/user";
import { useGlobalContext } from "@/context/globalContext";
import { Storage } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function ProtectedRoutesWrapper ({ children }: { children: React.ReactNode }) {
  const {
    setLoading,
    setError,
    user,
    setUser,
  } = useGlobalContext();

  const [isClientSide, setIsClientSide] = useState<boolean>(false);
  useEffect(() => setIsClientSide(true), []);

  if (isClientSide) {
    const cookies = Storage.getCookies();
    const hasOnlyRefreshToken = !!cookies.refreshToken && !cookies.accessToken;
  
    if (hasOnlyRefreshToken) refershToken();
  }

  useEffect(() => {
    async function getUserData () {
      if (!user) {
        try {
          setLoading(true);
          const userData = await getMeData();
          setUser(userData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    getUserData()
  }, []);

  return (
    <>
      {children}
    </>
  );
}