import Divisor from "@/components/divisor";
import UpdateAccountFielsForm from "@/components/updateAccountFielsForm";

export default function Profile () {
  return (
    <section className="bg-(--border) rounded-lg flex flex-col max-w-7xl w-full m-auto px-16 py-4 gap-4">
      <div className="flex flex-col gap-2">
        <h1>Perfil</h1>
      </div>
      <Divisor />
      <div>
        <UpdateAccountFielsForm />
      </div>
    </section>
  );
}