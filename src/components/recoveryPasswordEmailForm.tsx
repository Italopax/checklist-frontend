'use client';

import Button from "./button";
import ErrorMessage from "./errorMessage";
import Input from "./inputs/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sendRecoveryPasswordVerificationCode } from "@/actions/user";
import { PagesRoutes } from "@/models";

export default function RecoveryPasswordEmailForm () {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const sendVerificationCode = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      await sendRecoveryPasswordVerificationCode(email);
      router.push(`${PagesRoutes.NEW_PASSWORD}?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setError('');
  }, [email]);

  return (
    <>
      <form 
        className="flex flex-col gap-8"
        onSubmit={sendVerificationCode}
      >
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Email"
            value={email}
            setValue={setEmail}
          />
        </div>

        <div className="flex flex-col gap-4">
          {error && (
            <ErrorMessage
              error={error}
            />
          )}
          <Button
            text="Enviar código"
            type="submit"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
}