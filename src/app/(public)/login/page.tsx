import LoginForm from "@/components/loginForm";
import RedirectToOtherPage from "@/components/redirectToOtherPage";
import { PagesRoutes } from "@/models";

export default function Login() {
  return (
    <section className="bg-(--border) p-8 rounded-lg flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1>Login</h1>
        <p>Realize o login na plataforma <strong>Checklist</strong>.</p>
      </div>
      <div className="flex flex-col gap-4">
        <LoginForm />
        <RedirectToOtherPage
          text="Não tem conta? Crie a sua aqui."
          page={PagesRoutes.CREATE_ACCOUNT}
        />
      </div>
    </section>
  );
}
