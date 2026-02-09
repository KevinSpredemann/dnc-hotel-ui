import { DetailPageProps } from "@/src/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getReservationById } from "../../api/reservations/actions";
import DetailPage from "@/src/components/DetailPage";
import UserDetail from "@/src/components/UserDetail";
import DetailRow from "@/src/components/DetailListItem/DetailRow";
import { get } from "http";
import { getFormattedPrice } from "@/src/helpers/format/money";
import { getFormattedDate } from "@/src/helpers/format/date";
import { getFormattedStatus } from "@/src/helpers/format/dictionary";
import Link from "@/src/components/Link";

const DetalhesReservaPage = async ({ params }: DetailPageProps) => {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservation = await getReservationById(Number(id));
  return (
    <DetailPage
      title={
        <>
          Sua reserva na
          <br />
          <span>{reservation.hotel.name}</span>
        </>
      }
      image={{
        src: reservation.hotel.image || "/no-hotel.jpg",
        alt: `Foto do hotel ${reservation.hotel.name}`,
      }}
      previousPageUrl="/reservas"
      asideContainer={{
        title: "Informações da estadia",
        children: (
          <div>
            <DetailRow
              title="Status"
              description={getFormattedStatus(reservation.status)}
              className="mt-6"
            />
            <DetailRow
              title="Código de confirmação"
              description={`${reservation.id}`}
              className="mt-6"
            />
            <DetailRow
              title="Valor total"
              description={getFormattedPrice(reservation.hotel.price)}
              className="mt-6"
            />
            <DetailRow
              title="Check-in"
              description={getFormattedDate(reservation.checkIn)}
              className="mt-6"
            />
            <DetailRow
              title="Check-out"
              description={getFormattedDate(reservation.checkOut)}
              className="mt-6"
            />
            <hr className="mt-10" />
            <Link className="block w-full text-center mt-10" href={"/reservas"}>
              Voltar para minhas reservas
            </Link>
          </div>
        ),
      }}
    >
      <UserDetail user={reservation.hotel.owner} />
      <hr className="my-4" />
      <div className="flex flex-col mt-4">
        <h3 className="font-bold text-2xl">Endereço</h3>
        <span className="mt-4">{reservation.hotel.address}</span>
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="font-bold text-2xl">Sobre este espaço</h3>
        <span className="mt-4">{reservation.hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default DetalhesReservaPage;
