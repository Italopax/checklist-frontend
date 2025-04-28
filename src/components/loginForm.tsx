'use client';

import { useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import { loginSubmit } from "@/actions/auth";
import ErrorMessage from "./errorMessage";
import { redirect } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";

export default function LoginForm () {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const {
    loading,
    setLoading,
    error,
    setError,
  } = useGlobalContext();

  const loginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await loginSubmit({ login, password });
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }

    redirect('/validate-email');   
  }

  useEffect(() => {
    setError('');
  }, [login, password]);

  return (
    <form 
      className="flex flex-col gap-8"
      onSubmit={loginFormSubmit}
    >
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Usuário"
          value={login}
          setValue={setLogin}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          setValue={setPassword}
        />
      </div>

      <div className="flex flex-col gap-4">
        {error && (
          <ErrorMessage
            error={error}
          />
        )}
        <Button
          text="Login"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
}