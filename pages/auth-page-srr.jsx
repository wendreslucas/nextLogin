import React from "react";
import { tokenService } from "./../src/service/auth/tokenService";

function AuthPageSrr(props) {
  console.log(tokenService.get());

  return (
    <div>
      <h1>Auth Page Server Side Rendering</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSrr;
