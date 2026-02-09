"use client";

import Button from "@/src/components/Button";
import TextField from "@/src/components/Form/TextField";
import Link from "@/src/components/Link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.ok) {
      router.push("/");
    } else {
      alert("Erro na autenticação");
    }
  };
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="font-bold">Entrar ou Cadastrar-se</span>
      <h3 className="w-full text-left text-xl pt-4 text-main-brand-blue-500">
        Bem vindo a Dnc Hotel!
      </h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          type="email"
          className="mt-2"
          required
        />

        <TextField
          id="password"
          name="password"
          label="Senha"
          type="password"
          className="mt-2"
          required
        />
        <Button type="submit" appearance="primary" className="mt-2">
          Continuar
        </Button>
      </form>
      <span className="my-2">ou</span>
      <Link href="/cadastrar" className=" my-2">
        Cadastre-se
      </Link>
      <Link href="/esqueci-senha" className="">
        Esqueci minha senha
      </Link>
    </article>
  );
}
