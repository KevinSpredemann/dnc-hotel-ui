import { ReservationStatus } from "@/src/types/Reservation";

export const STATUS = {
  APPROVED: "APPROVED",
  CANCELLED: "CANCELLED",
  PENDING: "PENDING",
};

export const STATUS_DICT = {
  [STATUS.APPROVED]: "Aprovado",
  [STATUS.CANCELLED]: "Cancelado",
  [STATUS.PENDING]: "Pendente",
};

export const getFormattedStatus = (status: ReservationStatus) => {
  return STATUS_DICT[status] || "Erro ao buscar status ";
};
