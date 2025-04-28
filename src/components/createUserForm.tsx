'use client';

import { useEffect, useState } from "react";
import Input from "./input";
import ErrorMessage from "./errorMessage";
import Button from "./button";
import { redirect } from "next/navigation";
import { createUserSubmit } from "@/actions/user";
import { useGlobalContext } from "@/context/globalContext";

export default function CreateUserForm () {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    loading,
    setLoading,
    error,
    setError,
  } = useGlobalContext();

  const createUserFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await createUserSubmit({ name, email, password });
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }

    redirect('/login');
  }

  useEffect(() => {
    setError('');
  }, [name, email, password]);

  return (
    <form 
      className="flex flex-col gap-8"
      onSubmit={createUserFormSubmit}
    >
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          setValue={setName}
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          setValue={setEmail}
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
          text="Criar conta"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
}
