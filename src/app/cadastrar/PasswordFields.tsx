"use client";

import TextField from "@/src/components/Form/TextField";
import { useState } from "react";

const PasswordFields = () => {
  const [passwordMatches, setPasswordMatches] = useState<boolean>(true);

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    const passwordInput = document.getElementById(
      "password",
    ) as HTMLInputElement;
    const password = passwordInput.value;

    setPasswordMatches(confirmPassword === password);
  };
  return (
    <>
      <TextField
        label="Senha"
        type="password"
        id="password"
        name="password"
        className="mt-2"
        required
      />
      <TextField
        label="Confirmar Senha"
        type="password"
        id="confirm-password"
        name="confirm-password"
        onChange={handlePassword}
        className="mt-2"
        error={passwordMatches ? false : "Campos de senhas não coincidem"}
        required
      />
    </>
  );
};

export default PasswordFields;
