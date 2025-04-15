'use client';

import { useEffect, useState } from "react";
import Input from "./input";
import ErrorMessage from "./errorMessage";
import Button from "./button";
import Form from "next/form";
import { redirect } from "next/navigation";
import { createUserSubmit } from "@/actions/createUser";

export default function CreateUserForm () {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const createUserFormSubmit = async () => {
    try {
      await createUserSubmit({ name, email, password });
    } catch (error) {
      setError(error.message);
      return;
    }

    redirect('/teste2');
  }

  useEffect(() => {
    setError('');
  }, [name, email, password]);

  return (
    <Form 
      className="flex flex-col gap-8"
      action={createUserFormSubmit}
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
        />
      </div>
    </Form>
  );
}
