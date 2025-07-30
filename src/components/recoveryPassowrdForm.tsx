'use client';

import Button from "./button";
import ErrorMessage from "./errorMessage";
import Input from "./inputs/input";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { recoveryPassword } from "@/actions/user";
import { PagesRoutes } from "@/models";

export default function RecoveryPasswordForm () {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassowrd] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email') || '';

  const recoveryPasswordForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      await recoveryPassword({
        verificationCode,
        newPassword,
        email: userEmail,
      });
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }

    redirect(PagesRoutes.LOGIN);
  }

  useEffect(() => {
    setError('');
  }, [verificationCode]);

  return (
    <>
      <form 
        className="flex flex-col gap-8"
        onSubmit={recoveryPasswordForm}
      >
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Código de verificação"
            value={verificationCode}
            setValue={setVerificationCode}
          />
          <Input
            type="text"
            placeholder="Nova senha desejada"
            value={newPassword}
            setValue={setNewPassowrd}
          />
        </div>

        <div className="flex flex-col gap-4">
          {error && (
            <ErrorMessage
              error={error}
            />
          )}
          <Button
            text="Recuperar senha"
            type="submit"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}