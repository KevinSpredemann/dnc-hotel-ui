"use client";

import Link from "@/src/components/Link";
import { Reservation } from "@/src/types/Reservation";
import { useSession } from "next-auth/react";

type BackButtonProps = {
  reservations: Reservation;
  className?: string;
  text?: string;
};

const BackButton = ({ reservations, className, text }: BackButtonProps) => {
  const { data } = useSession();
  return (
    <Link
      className={`${className ?? "block w-full text-center mt-10"}`}
      href={
        data?.user.role === "ADMIN"
          ? `/minhas-hospedagens/${reservations.hotel.id}/reservas`
          : "/reservas"
      }
    >
      {text ? text : "Voltar para minhas reservas"}
    </Link>
  );
};

export default BackButton;
