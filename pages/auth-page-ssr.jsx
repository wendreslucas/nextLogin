import React from "react";
import { withSession } from "../src/service/auth/session";

function AuthPageSrr(props) {
  return (
    <div>
      <h1>Auth Page Server Side Rendering</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSrr;

// Implements Decorator Pattern

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});

// export async function getServerSideProps(ctx) {
//   try {
//     const session = await authService.getSession(ctx);
//     return {
//       props: {
//         session,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/?error=401",
//       },
//     };
//   }
