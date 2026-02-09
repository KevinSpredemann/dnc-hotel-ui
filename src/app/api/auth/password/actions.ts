"use server";
import axios from "@/src/api";
import { redirect } from "next/navigation";

type ForgotPasswordState = {
  message?: string;
  error?: unknown;
};

export async function forgotPassword(
  prevState: ForgotPasswordState | void,
  formData: FormData,
): Promise<ForgotPasswordState | void> {
  try {
    const payload = { email: formData.get("email") };

    const { data } = await axios.post("/auth/forgot-password", payload);
    console.log(data);
  } catch (error) {
    return {
      ...(prevState ?? {}),
      message: "Erro ao enviar e-mail",
      error,
    };
  }

  redirect("/recuperar-senha");
}

type RecoverPasswordState = {
  success?: boolean;
  message?: string;
  error?: unknown;
  result?: unknown;
};

export async function recoverPassword(
  prevState: RecoverPasswordState | void,
  formData: FormData,
): Promise<RecoverPasswordState | void> {
  try {
    const payload = {
      token: formData.get("token"),
      password: formData.get("password"),
    };

    const { data } = await axios.patch("/auth/reset-password", payload);

    return { ...data, success: true };
  } catch (error) {
    return {
      ...(prevState ?? {}),
      message: "Erro ao enviar e-mail",
      error,
    };
  }
}
