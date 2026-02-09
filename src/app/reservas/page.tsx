import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getReservationsByUser } from "../api/reservations/actions";
import DetailListItem from "@/src/components/DetailListItem";
import Link from "@/src/components/Link";
import { STATUS } from "@/src/helpers/format/dictionary";
import { Reservation } from "@/src/types/Reservation";

type ReducedReservations = {
  pending: Reservation[];
  approved: Reservation[];
  cancelled: Reservation[];
};

const ReservasPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  const reservations = await getReservationsByUser();

  const { pending, approved, cancelled } =
    reservations.reduce<ReducedReservations>(
      (prev, current) => {
        if (current.status === STATUS.PENDING)
          return { ...prev, pending: [...prev.pending, current] };
        else if (current.status === STATUS.APPROVED)
          return { ...prev, approved: [...prev.approved, current] };
        else if (current.status === STATUS.CANCELLED)
          return { ...prev, cancelled: [...prev.cancelled, current] };
        else {
          return prev;
        }
      },
      { pending: [], approved: [], cancelled: [] },
    );
  return (
    <div className="py-20">
      <Link href="/perfil" className="my-10">
        Voltar
      </Link>
      <h1 className="font-bold text-4xl mt-10">Minhas Reservas</h1>
      <span className="flex text-2xl font-bold mt-12">Próximas reservas</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <DetailListItem key={reservation.id} reservation={reservation} />
        ))}
      </section>
      <hr className="mt-10" />
      <span className="flex text-2xl font-bold mt-12">Reservas anteriores</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <DetailListItem key={reservation.id} reservation={reservation} />
        ))}
      </section>
      <hr className="mt-10" />
      <span className="flex text-2xl font-bold mt-12">Reservas canceladas</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {cancelled.map((reservation) => (
          <DetailListItem key={reservation.id} reservation={reservation} />
        ))}
      </section>
    </div>
  );
};

export default ReservasPage;
