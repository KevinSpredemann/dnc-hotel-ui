"use server";

import axios from "@/src/api";
import { UserFormState } from "@/src/types/UserFormState";

export async function signup(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    const avatar = formData.get("avatar") as File;
    const formDataAvatar = new FormData();
    formDataAvatar.set("avatar", avatar);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const {
      data: { access_token },
    } = await axios.post("/auth/register", payload);

    if (avatar.size) {
      await axios.post("/users/avatar", formDataAvatar, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    }

    return { error: false };
  } catch (error) {
    return {
      error: true,
      message: "Não foi possível realizar seu cadastro, tente novamente mais tarde",
    };
  }
}
