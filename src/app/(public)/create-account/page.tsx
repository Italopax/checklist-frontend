import CreateUserForm from "@/components/createUserForm";

export default function CreateUser () {
  return (
    <section className="bg-(--border) p-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1>Criação de conta</h1>
        <p>Crie a sua conta no <strong>Checklist</strong>.</p>
      </div>
      <div>
        <CreateUserForm />
      </div>
    </section>
  );
}
