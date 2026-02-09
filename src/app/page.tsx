import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getFormattedPrice } from "../helpers/format/money";
import Pagination from "../components/Pagination";
import Link from "next/link";
import { getHotels } from "./api/hotels/actions";
type HomeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const LIMIT = 8;
export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const currentPage = Number(params.page ?? 1);

  const { data: hotels, total, per_page } = await getHotels(currentPage, LIMIT);

  return (
    <div className="min-h-screen">
      <section className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-10 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {hotels.map((hotel) => (
          <Link href={`/hotels/${hotel.id}`} key={hotel.id}>
            <article className="flex flex-col">
              <div className="w-54 h-48">
                <Image
                  src={hotel.image ?? "/no-hotel.jpg"}
                  width={250}
                  height={250}
                  alt={`Foto do hotel ${hotel.name}`}
                  className="object-cover rounded-3xl h-48"
                  unoptimized
                />
              </div>
              <h3 className="font-bold mt-1">{hotel.name}</h3>
              <span className="mt-2">{hotel.owner.name}</span>
              <span className="mt-2">
                <b>{getFormattedPrice(hotel.price)}</b> noite
              </span>
            </article>
          </Link>
        ))}
      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / per_page)}
          destination="/"
        />
      </section>
    </div>
  );
}
