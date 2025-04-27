'use client';

import { User } from "@/models";
import { Dispatch, SetStateAction, useContext, useState, createContext } from "react";

type GlobalContextProviderProps = {
  children: React.ReactNode;
}

type GlobalContext = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const GlobalContext = createContext<GlobalContext>({
  loading: false,
  setLoading: () => {},
  error: '',
  setError: () => {},
  user: null,
  setUser: () => {},
});

export function GlobalContextProvider ({ children }: GlobalContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  return (
    <GlobalContext.Provider value={{
      loading,
      setLoading,
      error,
      setError,
      user,
      setUser
    }}>
      { children }
    </GlobalContext.Provider>
  );
} 

export function useGlobalContext () {
  return useContext(GlobalContext);
}