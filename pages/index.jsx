import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/service/auth/authService";

export default function HomeScreen() {
  const [values, setValues] = React.useState({
    usuario: "omariosouto",
    senha: "safepassword",
  });

  const router = useRouter();

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    authService
      .login({
        username: values.usuario,
        password: values.senha,
      })
      .then(() => {
        //router.push("/auth-page-static");
        router.push("/auth-page-ssr");
      })
      .catch((err) => {
        alert("Dados incorretos");
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Usuário"
          name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={values.senha}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>
        <p>
          <a href="/auth-page-ssr">Auth Page SSR</a>
          <br />
          <a href="/auth-page-static">Auth Page Static</a>
        </p>
      </form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
