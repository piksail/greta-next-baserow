"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSessionStorage } from "@uidotdev/usehooks";

export default function Exo7() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Depending on the use case, localStorage could be more appropriate
  const [accessToken, setAccessToken] = useSessionStorage("access_token", "");
  const [refreshToken, setRefreshToken] = useSessionStorage(
    "refresh_token",
    "",
  );

  const isDisabled = !email || !password;

  const loginMutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault();
      return fetch(
        `${process.env.NEXT_PUBLIC_BASEROW_API_URL}user/token-auth/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      ).then((res) => res.json());
    },
    onSuccess: (data) => {
      const { access_token, refresh_token } = data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASEROW_API_URL}user/token-refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
        },
      ).then((res) => res.json());
    },
    onSuccess: (data) => {
      const { access_token } = data;
      setAccessToken(access_token);
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 7</h1>

      <form className="mx-auto mt-12 flex max-w-screen-sm flex-col gap-7 rounded bg-indigo-500 p-8 text-xl text-white">
        <label className="flex flex-col gap-1 text-left shadow-black drop-shadow">
          <span>Email</span>
          <input
            required
            type="email"
            className="border-b-2 border-white"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-left shadow-black drop-shadow">
          <span>Mot de passe</span>
          <input
            required
            type="password"
            className="border-b-2 border-white"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          className={`mx-auto mt-12 inline-block w-fit rounded bg-white px-4 py-2 text-2xl font-bold ${isDisabled ? "text-indigo-900/20" : "cursor-pointer text-indigo-900"}`}
          disabled={isDisabled}
          onClick={(event) => loginMutation.mutate(event)}
        >
          Valider
        </button>

        {loginMutation.isPending && (
          <p className="mt-12 text-4xl">Chargement...</p>
        )}

        {loginMutation.error && (
          <p className="mt-12 bg-red-600 text-2xl text-white">
            Une erreur est survenue : {loginMutation.error.message}
          </p>
        )}

        {loginMutation.isSuccess && (
          <p className="mt-12 bg-green-600 text-2xl text-white">
            Authentifié en tant que : {loginMutation.data.user.first_name}
          </p>
        )}
      </form>

      {accessToken && (
        <button
          className={`mx-auto mt-12 block w-fit cursor-pointer rounded border-2 border-indigo-500 px-4 py-2 text-2xl font-bold`}
          onClick={() => refreshTokenMutation.mutate()}
        >
          Rafraîchir la session
        </button>
      )}
      {accessToken && refreshTokenMutation.isSuccess && (
        <p className="">Session rafraîchie</p>
      )}

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
