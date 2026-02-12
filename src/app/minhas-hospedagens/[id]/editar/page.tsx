import { getHotelById } from "@/src/app/api/hotels/actions";
import HotelForm from "@/src/components/HotelForm";
import Link from "@/src/components/Link";
import { DetailPageProps } from "@/src/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
const EditarHotelPage = async ({ params }: DetailPageProps) => {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotel = await getHotelById(Number(id));
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="mb-2 font-medium">
        {hotel ? "Editar Hospedagem" : "Cadastrar Hospedagem"}
      </span>
      <HotelForm hotel={hotel} />
      <Link href="/minhas-hospedagens" className="my-2">
        Voltar
      </Link>
    </section>
  );
};

export default EditarHotelPage;
