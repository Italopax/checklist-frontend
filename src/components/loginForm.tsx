'use client';

import { useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import Form from 'next/form';
import { loginSubmit } from "@/actions/login";
import ErrorMessage from "./errorMessage";
import { redirect } from "next/navigation";

export default function LoginForm () {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loginFormSubmit = async () => {
    try {
      await loginSubmit({ login, password });
    } catch (error) {
      setError(error.message);
      return;
    }

    redirect('/teste');
  }

  useEffect(() => {
    setError('');
  }, [login, password]);

  return (
    <Form 
      className="flex flex-col gap-8"
      action={loginFormSubmit}
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
        />
      </div>
    </Form>
  );
}