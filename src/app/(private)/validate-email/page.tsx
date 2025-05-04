'use client';

import ValidateEmailForm from "@/components/validateEmailForm";

export default function ValidateEmail() {
  return (
    <section className="bg-(--border) p-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1>Validação de email</h1>
        <p>Insira o código de verificação que você recebeu no seu email.</p>
      </div>
      <div className="flex flex-col gap-4">
        <ValidateEmailForm />
      </div>
    </section>
  );
}
