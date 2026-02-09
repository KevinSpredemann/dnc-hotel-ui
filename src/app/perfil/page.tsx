import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getProfile } from "../api/users/actions";
import DetailPage from "@/src/components/DetailPage";
import Image from "next/image";
import DetailRow from "@/src/components/DetailListItem/DetailRow";
import Link from "@/src/components/Link";
import { Reservation } from "@/src/types/Reservation";
import DetailListItem from "@/src/components/DetailListItem";

type RecentReservationProps = {
  reservation?: Reservation;
};
const RecentReservation = ({ reservation }: RecentReservationProps) => {
  if (!reservation) {
    return (
      <div className="mt-10 w-full flex flex-col justify-start">
        <span className="text-gray-400">Nenhuma reserva recente</span>
      </div>
    );
  }
  return (
    <>
      <div className="my-10">
        <DetailListItem reservation={reservation} />
      </div>
      <Link href="/reservas" className="flex justify-center">
        Ver todas as reservas
      </Link>
    </>
  );
};

const PerfilPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const user = await getProfile();
  return (
    <DetailPage
      title="Meu perfil"
      previousPageUrl="/"
      asideContainer={{
        title: "Reserva mais recente",
        children: <RecentReservation reservation={user.lastReservation} />,
      }}
    >
      <div className="mt-4 flex flex-col justify-center items-center">
        <Image
          src={user.avatar ?? "/no-avatar.png"}
          alt={`Foto do proprietário do hotel ${user.name}`}
          width={300}
          height={300}
          className="rounded-full w-36 h-36 object-cover"
          unoptimized
        />
        <div className="flex flex-col mt-2 justify-center">
          <span className="text-gray-500 font-bold">
            No Dnc Hotel desde {new Date(user.createdAt).getFullYear()}
          </span>
        </div>
      </div>
      <hr className="my-10" />
      <DetailRow title="Nome" description={user.name} className="mt-2" />
      <DetailRow title="Email" description={user.email} className="mt-2" />
      <div className="w-full mt-10">
        <Link href="/perfil/editar" className="block text-center">
          Editar perfil
        </Link>
      </div>
    </DetailPage>
  );
};

export default PerfilPage;
