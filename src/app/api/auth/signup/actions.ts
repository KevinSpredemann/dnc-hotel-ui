"use server";

import axios from "@/src/api";
import { UserFormState } from "@/src/types/UserFormState";
import { redirect } from "next/navigation";

export async function signup(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    const avatar = formData.get("avatar") as File | null;

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const {
      data: { access_token },
    } = await axios.post("/auth/register", payload);

    if (avatar && avatar.size > 0) {
      const formDataAvatar = new FormData();
      formDataAvatar.append("avatar", avatar);

      await axios.post("/users/avatar", formDataAvatar, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
  } catch (error) {
    return {
      ...prevState,
      error: true,
      message: "Não foi possível cadastrar usuário",
    };
  }

  redirect("/login");
}
