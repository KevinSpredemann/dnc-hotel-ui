"use client";

import Alert from "@/src/components/Alert";
import Button from "@/src/components/Button";
import TextField from "@/src/components/Form/TextField";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { recoverPassword } from "../../api/auth/password/actions";
import PasswordFields from "../../cadastrar/PasswordFields";
import Link from "@/src/components/Link";

const initialState = { message: "" };

const RecoverPassword = () => {
  const [state, formAction] = useActionState(recoverPassword, initialState);
  const { pending } = useFormStatus();

  return (
    <form
      className="w-full flex flex-col items-center justify-center"
      action={formAction}
    >
      {state?.message && <Alert type="danger">{state.message}</Alert>}
      <Image
        src="/recovery-password.svg"
        alt="Ilustração esqueci minha senha"
        width={120}
        height={115}
        className="mt-2"
      />
      {state?.success ? (
        <>
          <Alert type="success">Senha alterada com sucesso</Alert>
          <Link href="/login">Voltar ao login</Link>
        </>
      ) : (
        <>
          <TextField
            label="Token de confirmação"
            type="text"
            id="token"
            name="token"
            className="mt-4"
            required
          />
          <PasswordFields />
          <Button
            appearance="primary"
            type="submit"
            className="mt-6"
            disabled={pending}
          >
            Enviar e-mail
          </Button>
          <span className="mt-2">ou</span>
          <Link href="/login" className="my-2 text-red-600">
            Cancelar
          </Link>
        </>
      )}
    </form>
  );
};

export default RecoverPassword;
