import React, { useEffect } from "react";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import { tokenService } from "./../src/service/auth/tokenService";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(async () => {
    try {
      await HttpClient("/api/refresh", {
        method: "DELETE",
      });
      tokenService.delete();
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return <div>Você será redirecionado em breve...</div>;
}
