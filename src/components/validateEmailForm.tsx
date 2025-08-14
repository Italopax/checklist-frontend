'use client';

import { useGlobalContext } from "@/context/globalContext";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import Input from "./inputs/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMeData, resendVerificationCode, validateEmail } from "@/actions/user";
import { PagesRoutes } from "@/models";

export default function ValidateEmailForm () {
  const [code, setCode] = useState<string>('');
  const [resendCodeMessage, setResendCodeMessage] = useState<string>('');

  const {
    setUser,
    loading,
    setLoading,
    error,
    setError,
  } = useGlobalContext();

  const router = useRouter();

  const validateEmailSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      await validateEmail(code);

      const userData = await getMeData();
      setUser(userData);

      router.push(PagesRoutes.ITEMS_GROUPS);
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }
  
  const resendVerificationCodeSubmit = async (): Promise<void> => {
    try {
      setError('');
      setLoading(true);
      await resendVerificationCode();

      setResendCodeMessage('Código enviado com sucesso, verifique seu email.');
      setTimeout(() => {
        setResendCodeMessage('');
      }, 5000);
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setError('');
  }, [code]);

  return (
    <>
      <form 
        className="flex flex-col gap-8"
        onSubmit={validateEmailSubmit}
      >
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Código de validação"
            value={code}
            setValue={setCode}
          />
        </div>

        <div className="flex flex-col gap-4">
          {error && (
            <ErrorMessage
              error={error}
            />
          )}
          <Button
            text="Verificar código"
            type="submit"
            loading={loading}
          />
        </div>
      </form>
      <div className="flex">
        {
          resendCodeMessage ? resendCodeMessage : (
            <p className="cursor-pointer hover:font-bold" onClick={resendVerificationCodeSubmit}>
              Reenviar código de validação.
            </p>
          )
        }
      </div>
    </>
  );
}