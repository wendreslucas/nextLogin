import { authService } from "./authService";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return funcao(modifiedCtx);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService
      .getSession()
      .then((session) => {
        setSession(session);
        console.log(session);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: {
      session,
    },
    error,
    loading,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();

    if (!session.loading && session.error) {
      console.log("redireciona");
      router.push("/?error=401");
    }
    const modifiedProps = {
      ...props,
      session: session.data.session,
    };

    return <Component {...modifiedProps} />;
  };
}
