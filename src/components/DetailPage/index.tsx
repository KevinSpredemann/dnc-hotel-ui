import Image from "next/image";
import Link from "../Link";
import React from "react";

type ImageProps = {
  src: string | null;
  alt: string;
};

type AsideContainerProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

type DetailPageProps = {
  previousPageUrl: string;
  children: React.ReactNode;
  image?: ImageProps;
  title: string | React.ReactNode;
  asideContainer: AsideContainerProps;
};

const DetailPage = ({
  previousPageUrl = "/",
  image,
  title,
  asideContainer,
  children,
}: DetailPageProps) => {
  return (
    <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
      <section className="w-full">
        <Link href={previousPageUrl}>Voltar</Link>
      </section>
      {image && (
        <section className="relative w-full h-80 mt-2">
          <Image
            src={image.src ?? "/no-hotel.jpg"}
            alt={image.alt}
            fill
            className="object-cover rounded-3xl"
            unoptimized
          />
        </section>
      )}
      <section className="flex flex-col mt-6 sm:flex-row">
        <article className="w-full">
          <h1 className="font-bold text-4xl ">{title}</h1>
          {children}
        </article>
        <article className="w-full h-auto shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-xl ml-0 p-8 flex flex-col justify-start self-start sm:ml-10 ">
          <span className="flex text-2xl font-bold">
            {asideContainer.title}
          </span>
          <div className="mt-0">{asideContainer.children}</div>
        </article>
      </section>
    </div>
  );
};

export default DetailPage;
