"use server";
import axios from "@/src/api";
import { Reservation, ReservationStatus } from "@/src/types/Reservation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHotelDetail } from "../hotels/actions";
import { Hotel } from "@/src/types/Hotel";

type reservationsPrevState = {
  error: boolean;
  message?: string;
};
export async function reserveHotelById(
  prevState: reservationsPrevState,
  formData: FormData,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const apiUrl = process.env.APP_API_URL;
  if (!apiUrl) {
    console.error("APP_API_URL não está definida!");
    return {
      ...prevState,
      message: "Erro de configuração do servidor",
      error: true,
    };
  }

  let reservationId;

  try {
    const payload = {
      hotelId: Number(formData.get("hotelId")),
      checkIn: String(formData.get("checkIn")),
      checkOut: String(formData.get("checkOut")),
    };

    console.log("Payload enviado:", JSON.stringify(payload));
    const { data } = await axios.post(`${apiUrl}/reservations`, payload, {
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Resposta do backend:", data);
    if (!data?.id) {
      return {
        ...prevState,
        message: "Reserva criada, mas ID não retornou. Tente novamente.",
        error: true,
      };
    }

    reservationId = data.id;
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return {
      ...prevState,
      message: "Não foi possível realizar a reserva",
      error: true,
    };
  }
  redirect(`/reservas/${reservationId}/sucesso`);
}
export async function getReservationById(id: number): Promise<Reservation> {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const hotel = await getHotelDetail(data.hotelId);

  return { ...data, hotel };
}

export async function getReservationsByUser(): Promise<Reservation[]> {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (data.length) {
    const reservations = await Promise.all(
      data.map(async (reservation: Reservation) => {
        const hotel = await getHotelDetail(reservation.hotelId);
        return { ...reservation, hotel };
      }),
    );

    return reservations;
  }

  return data;
}

export async function getReservationsByHotel(
  hotel: Hotel,
): Promise<Reservation[]> {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/hotel/${hotel.id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (data.length) {
    const reservations = data.map((reservation: Reservation) => {
      return { ...reservation, hotel };
    });

    return reservations;
  }

  return data;
}

export async function updateReservationStatus(
  reservationId: number,
  status: ReservationStatus,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.patch(
    `/reservations/${reservationId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  return data;
}
