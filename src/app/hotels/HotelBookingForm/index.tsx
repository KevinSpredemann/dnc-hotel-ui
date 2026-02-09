"use client";

import Button from "@/src/components/Button";
import CalendarField from "@/src/components/Form/CalendarField";
import TextField from "@/src/components/Form/TextField";
import { getFormattedPrice } from "@/src/helpers/format/money";
import { Hotel } from "@/src/types/Hotel";
import { ChangeEvent, useActionState, useState } from "react";
import { reserveHotelById } from "../../api/reservations/actions";
import Alert from "@/src/components/Alert";

type HotelBookingFormProps = {
  hotel: Hotel;
};

const getNightsInHotel = (checkIn: string | null, checkOut: string | null) => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();

  const diff = end - start;
  const diffDays = diff / (1000 * 60 * 60 * 24);
  return diffDays;
};

const initialState = { message: "", error: false };
const HotelBookingForm = ({ hotel }: HotelBookingFormProps) => {
  const [state, formAction] = useActionState(reserveHotelById, initialState);
  const today = new Date().toISOString().substring(0, 10);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const estimatedPrice =
    getNightsInHotel(checkInDate, checkOutDate) * hotel.price;
  return (
    <form action={formAction} className="flex w-full flex-col mt-2">
      <TextField
        id="hotelId"
        name="hotelId"
        defaultValue={hotel.id}
        label="ID do Hotel"
        readOnly
        hidden
      />
      <div className="w-full flex">
        <CalendarField
          id="checkIn"
          name="checkIn"
          label="Data de check-in"
          className="w-full m-5"
          required
          min={today}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCheckInDate(event.target.value);
          }}
        />
        <CalendarField
          id="checkOut"
          name="checkOut"
          label="Data de check-out"
          required
          className="w-full m-5"
          min={checkInDate ?? today}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCheckOutDate(event.target.value);
          }}
        />
      </div>
      <div className="flex w-full justify-between font-bold mt-6">
        <span>Valor Total:</span>
        <span>{getFormattedPrice(estimatedPrice)}</span>
      </div>
      <hr className="mt-10" />
      {state.error && <Alert type="danger">{state.message}</Alert>}
      <Button
        appearance="primary"
        type="submit"
        disabled={false}
        className="mt-10 block"
      >
        Reservar
      </Button>
    </form>
  );
};

export default HotelBookingForm;
