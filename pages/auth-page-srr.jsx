import React from "react";

function AuthPageSrr(props) {
  return (
    <div>
      <h1>Auth Page Server Side Rendering</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSrr;
