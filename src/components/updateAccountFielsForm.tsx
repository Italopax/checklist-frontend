'use client';

import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useState } from "react";
import Input from "./input";
import Button from "./button";
import Divisor from "./divisor";
import { getMeData, updateAccountInfos, updateAccountPassword } from "@/actions/user";

export default function UpdateAccountFielsForm () {
  const {
    loading,
    setLoading,
    error,
    setError,
    user,
    setUser,
  } = useGlobalContext();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [actualPassword, setActualPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const updateAccountData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await updateAccountInfos({ email, name });

      const userData = await getMeData();
      setUser(userData);
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }

  const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await updateAccountPassword({ newPassword, actualPassword });

      setActualPassword('');
      setNewPassword('');
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p>Verifique ou atualize suas informações de perfil.</p>
        <form className="flex flex-col gap-4" onSubmit={updateAccountData}>
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
          <Button
            text="Atualizar informações de perfil"
            type="submit"
            loading={loading}
          />
        </form>
      </div>

      <Divisor />

      <div className="flex flex-col gap-4">
        <p>Atualize sua senha.</p>
        <form className="flex flex-col gap-4" onSubmit={updatePassword}>
          <Input
            type="password"
            placeholder="Senha atual"
            value={actualPassword}
            setValue={setActualPassword}
          />
          <Input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            setValue={setNewPassword}
          />
          <Button
            text="Atualizar senha"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}