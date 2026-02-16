import DetailPage from "@/src/components/DetailPage";
import { getHotelDetail } from "../../api/hotels/actions";
import { getFormattedPrice } from "@/src/helpers/format/money";
import Image from "next/image";
import HotelBookingForm from "../HotelBookingForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { DetailPageProps } from "@/src/types/DetailPage";
import UserDetail from "@/src/components/UserDetail";

const HotelDetail = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  const { id } = await params;
  const hotel = await getHotelDetail(Number(id));
  return (
    <DetailPage
      previousPageUrl="/"
      title={hotel.name}
      image={{
        src: hotel.image ?? "no-hotel.jpg",
        alt: hotel.name,
      }}
      asideContainer={{
        title: (
          <>
            <b>{getFormattedPrice(hotel.price)}</b>&nbsp;noite
          </>
        ),
        children: <HotelBookingForm hotel={hotel} />,
      }}
    >
      <UserDetail user={hotel} />
      <hr className="mt-4" />
      <div className="flex flex-col mt-4">
        <h3 className="font-bold text-2xl">Endereço</h3>
        <span className="mt-4">{hotel.address}</span>
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="font-bold text-2xl">Sobre este espaço</h3>
        <span className="mt-4">{hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default HotelDetail;
