'use client';

import RecoveryPasswordForm from "@/components/recoveryPassowrdForm";

export default function NewPassword () {
  return (
    <section className="bg-(--border) p-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1>Recuperação de senha</h1>
        <p>Insira o seu código de verificação e a nova senha desejada.</p>
      </div>
      <div className="flex flex-col gap-4">
        <RecoveryPasswordForm />
      </div>
    </section>
  );
}