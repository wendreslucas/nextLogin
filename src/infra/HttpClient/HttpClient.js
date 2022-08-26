// Arquitetura hexagonal
import { tokenService } from "./../../service/auth/tokenService";
import nookies from "nookies";
// Ports and Adapters
export async function HttpClient(fetchUrl, fetchOptions = {}) {
  const defaultHeaders = fetchOptions.headers || {};
  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };
  return fetch(fetchUrl, options)
    .then(async (respostaDoServidor) => {
      return {
        ok: respostaDoServidor.ok,
        status: respostaDoServidor.status,
        statusText: respostaDoServidor.statusText,
        body: await respostaDoServidor.json(),
      };
    })
    .then(async (response) => {
      if (!fetchOptions.refresh) return response;
      if (response.status !== 401) return response;

      const isServer = true;
      const currentRefreshToken =
        fetchOptions?.ctx?.req?.cookies["REFRESH_TOKEN_NAME"];
      console.log("Middleware: Rodar código para atualizar token");

      // [Tentar atualizar os tokens]
      const refreshResponse = await HttpClient(
        "http://localhost:3000/api/refresh",
        {
          method: isServer ? "PUT" : "GET",
          body: isServer ? { refresh_token: currentRefreshToken } : undefined,
        }
      );

      const newAccessToken = refreshResponse.body.data.access_token;
      const newRefreshToken = refreshResponse.body.data.refresh_token;

      if (isServer) {
        nookies.set(fetchOptions.ctx, "REFRESH_TOKEN_NAME", newRefreshToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });
      }

      // [Tentar Guardar o token]
      tokenService.save(newAccessToken);

      // [Tentar rodar o request anterior]
      const retryResponse = await HttpClient(fetchUrl, {
        ...options,
        refresh: false,
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      console.log("retryResponse", retryResponse);
      return retryResponse;
    });
}
