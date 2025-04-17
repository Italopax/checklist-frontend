'use client';

import { Dispatch, SetStateAction, useContext, useState, createContext } from "react";

type GlobalContextProviderProps = {
  children: React.ReactNode;
}

type GlobalContext = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContext>({
  loading: false,
  setLoading: () => {},
  error: '',
  setError: () => {},
});

export function GlobalContextProvider ({ children }: GlobalContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  return (
    <GlobalContext.Provider value={{
      loading,
      setLoading,
      error,
      setError
    }}>
      { children }
    </GlobalContext.Provider>
  );
} 

export function useGlobalContext () {
  return useContext(GlobalContext);
}