"use client";

import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import TextField from "@/src/components/Form/TextField";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { forgotPassword } from "@/src/app/api/auth/password/actions";

const initialState = { message: "" };

export default function ForgotPassword() {
  const [state, formAction] = useActionState(forgotPassword, initialState);
  const { pending } = useFormStatus();

  return (
    <form
      className="w-full flex flex-col items-center justify-center"
      action={formAction}
    >
      {state?.message && <Alert type="danger">{state.message}</Alert>}
      <Image
        src="/forgot-password.svg"
        alt="Ilustração esqueci minha senha"
        width={172}
        height={167}
        className="mt-6"
      />
      <TextField
        label="E-mail"
        type="email"
        id="email"
        name="email"
        className="mt-6"
        required
      />
      <Button
        appearance="primary"
        type="submit"
        className="mt-8"
        disabled={pending}
      >
        Enviar e-mail
      </Button>
    </form>
  );
}
