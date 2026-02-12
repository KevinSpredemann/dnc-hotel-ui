import Link from "@/src/components/Link";
import UserForm from "@/src/components/UserForm";
import { User } from "@/src/types/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const EditarPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="mb-2">Editar perfil</span>
      <UserForm user={session.user as User} />
      <Link href="/login" className="my-2">
        Voltar
      </Link>
    </section>
  );
};

export default EditarPage;
