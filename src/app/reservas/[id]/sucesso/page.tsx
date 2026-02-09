import { getReservationById } from "@/src/app/api/reservations/actions";
import Link from "@/src/components/Link";
import UserDetail from "@/src/components/UserDetail";
import { DetailPageProps } from "@/src/types/DetailPage";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
const SolicitacaoReservaPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  const reservation = await getReservationById(Number((await params).id));
  const { hotel } = reservation;
  return (
    <div className="flex flex-col w-full max-w-lg my-24 px-8">
      <section className="w-full">
        <Link href="/reservas">Voltar</Link>
      </section>
      <section className="flex mt-2 flex-col">
        <article className="w-full">
          <h1 className="font-bold text-4xl">
            Sua solicitação de reserva na {hotel.name} foi enviada!
          </h1>
          <UserDetail user={hotel.owner} />
          <hr className="mt-4" />
          <div className="flex flex-col mt-4">
            <h3 className="font-bold text-2xl">
              Enviamos a sua solicitação de reserva para o Anfitrião
            </h3>
            <span className="mt-4">
              Estamos aguardando o anfitrião aprovar a sua reserva na{" "}
              {hotel.name}, em breve você receberá atualizações sobre a sua
              solicitação.
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="font-bold text-2xl">Endereço</h3>
            <span className="mt-4">{hotel.address}</span>
          </div>
        </article>
      </section>
    </div>
  );
};

export default SolicitacaoReservaPage;
