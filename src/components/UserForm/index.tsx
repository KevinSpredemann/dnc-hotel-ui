"use client";
import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import RadioGroup from "../Form/RadioGroup";
import Button from "../Button";
import Alert from "../Alert";
import { signup } from "@/src/app/api/auth/signup/actions";
import { updateProfile } from "@/src/app/api/users/actions";

import PasswordFields from "@/src/app/cadastrar/PasswordFields";
import { User } from "@/src/types/User";
import { useActionState } from "react";

const initialState = { error: false, message: "" };

type UserFormProps = {
  user?: User;
};

const UserForm = ({ user }: UserFormProps) => {
  const action = user ? updateProfile : signup;
  const [state, formAction] = useActionState(action, initialState);
  return (
    <>
      {state.error && <Alert type="danger">{state.message}</Alert>}
      <form className="w-full" action={formAction}>
        <ImageField
          name="avatar"
          label="Selecionar foto"
          id="avatar"
          defaultValue={user?.image as string}
        />
        <TextField
          label="Digite o nome completo"
          type="text"
          id="name"
          name="name"
          className="mt-2"
          defaultValue={user?.name}
          required
        />
        <TextField
          label="E-mail"
          type="email"
          id="email"
          name="email"
          className="mt-2"
          defaultValue={user?.email}
          required
        />
        {!user && (
          <>
            <PasswordFields />
            <RadioGroup
              options={[
                { label: "Sim", value: "ADMIN", id: "yes", name: "role" },
                { label: "Não", value: "USER", id: "no", name: "role" },
              ]}
              label="Você deseja anunciar hospedagens?"
              classname="my-2"
              name="role"
            />
          </>
        )}
        <Button appearance="primary" type="submit" className="mt-2">
          {user ? "Editar" : "Cadastrar-se"}
        </Button>
      </form>
    </>
  );
};

export default UserForm;
