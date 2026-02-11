import DetailPage from "@/src/components/DetailPage";
import { DetailPageProps } from "@/src/types/DetailPage";

const MinhasReservasHotelPage = async ({ params }: DetailPageProps) => {
  const { id } = await params;

  return (
    <DetailPage
      title="Minhas hospedagens"
      previousPageUrl="/minhas-hospedagens"
      additionalLink={`/minhas-hospedagens/${id}/editar`}
      additionalText="Editar Hotel"
      asideContainer={{
        title: "Teste",
        children: <div></div>,
      }}
    >
      teste
    </DetailPage>
  );
};

export default MinhasReservasHotelPage;
