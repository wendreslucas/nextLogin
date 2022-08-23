import React from "react";
import { tokenService } from "./../src/service/auth/tokenService";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  console.log(tokenService.get());
  const cookies = nookies.get(ctx);
  console.log(cookies);

  return {
    props: {
      tokenService: tokenService.get(ctx),
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
