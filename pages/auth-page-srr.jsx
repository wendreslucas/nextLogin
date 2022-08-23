import React from "react";
import { authService } from "./../src/service/auth/authService";

export async function getServerSideProps(ctx) {
  const session = await authService.getSession(ctx);
  return {
    props: {
      // token,
      session,
    },
  };
}

function AuthPageSrr(props) {
  return (
    <div>
      <h1>Auth Page Server Side Rendering</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSrr;
