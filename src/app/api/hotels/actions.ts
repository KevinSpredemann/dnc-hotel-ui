"use server";
import axios from "@/src/api";
import { Hotel, HotelPagination } from "@/src/types/Hotel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type hotelPrevState = {
  error: boolean;
  message?: string;
};

export async function getHotels(
  page: number,
  limit: number,
): Promise<HotelPagination> {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get("/hotels", {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export const getHotelDetail = async (id: number): Promise<Hotel> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const getHotelById = async (id: number): Promise<Hotel> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export async function createHotel(
  prevState: hotelPrevState,
  formData: FormData,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  try {
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(
        price
          .replaceAll("R$", "")
          .replaceAll(/\s/g, "")
          .replaceAll(".", "")
          .replaceAll(",", "."),
      ),
      address: formData.get("address"),
    };

    const { data } = await axios.post(`/hotels`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const hotelId = data.id;

    if (image?.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    console.log("tratar erro: ", error);
    return {
      ...prevState,
      message: "Não foi possível cadastrar o hotel",
      error: true,
    };
  }

  redirect("/minhas-hospedagens");
}

export async function updateHotel(
  prevState: hotelPrevState,
  formData: FormData,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  try {
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;
    const id = formData.get("id") as string;

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(
        price
          .replaceAll("R$", "")
          .replaceAll(/\s/g, "")
          .replaceAll(".", "")
          .replaceAll(",", "."),
      ),
      address: formData.get("address"),
    };

    console.log(payload, { id });

    const { data } = await axios.patch(`/hotels/${id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const hotelId = data.id;

    if (image?.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    console.log("tratar erro: ", error);
    return {
      ...prevState,
      message: "Não foi possível cadastrar o hotel",
      error: true,
    };
  }

  redirect("/minhas-hospedagens");
}

export async function getHotelByOwner(): Promise<Hotel[]> {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/hotels/owner`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log(data);
  return data;
}
