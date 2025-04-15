import LoginForm from "@/components/loginForm";

export default function Login() {
  return (
    <section className="bg-(--borderDark) p-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1>Login</h1>
        <p>Realize o login na plataforma <strong>Checklist</strong>.</p>
      </div>
      <div>
        <LoginForm />
      </div>
    </section>
  );
}
