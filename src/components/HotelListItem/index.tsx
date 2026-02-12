import Image from "next/image";
import Link from "next/link";
import { Hotel } from "@/src/types/Hotel";
import DetailRow from "../DetailListItem/DetailRow";
import { getFormattedPrice } from "@/src/helpers/format/money";
type HotelListProps = {
  hotel: Hotel;
};

const HotelListItem = ({ hotel }: HotelListProps) => {
  console.log(hotel);
  return (
    <Link
      href={`/minhas-hospedagens/${hotel.id}/reservas`}
      className="flex w-full mt-5 mb-5 md:mt-0"
      key={hotel.ownerId}
    >
      <div className="relative w-32 h-32 shrink-0">
        <Image
          src={hotel.image ?? "/no-hotel.jpg"}
          alt={`Foto do hotel ${hotel.name}`}
          fill
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>
      <div className="w-full flex flex-col justify-between ml-4">
        <b>{hotel.name}</b>
        <div>
          <DetailRow
            title="Endereço:"
            description={hotel.address}
            className="mt-1 text-gray-600"
          />
          <DetailRow
            title="Preço:"
            description={getFormattedPrice(hotel.price)}
            className="mt-1 text-gray-600"
          />
        </div>
      </div>
    </Link>
  );
};

export default HotelListItem;
