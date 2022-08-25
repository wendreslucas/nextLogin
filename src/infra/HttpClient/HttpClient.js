// Arquitetura hexagonal
// Ports and Adapters
export async function HttpClient(fetchUrl, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
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
      console.log("Rodar código para atualizar token");

      // [Tentar atualizar os tokens]
      const refreshResponse = await HttpClient(
        "http://localhost:3000/api/refresh",
        {
          method: "GET",
        }
      );
      const newAccessToken = refreshResponse.body.data.access_token;
      const newRefreshToken = refreshResponse.body.data.refresh_token;

      console.log();
      return response;
    });
}
