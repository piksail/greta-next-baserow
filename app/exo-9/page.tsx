"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSessionStorage } from "@uidotdev/usehooks";
import { BaserowCourse } from "@/types";
import Link from "next/link";

export default function Exo9() {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useSessionStorage("access_token", "");

  type BaserowCourseCreateInput = {
    name: string;
    start_date: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaserowCourseCreateInput>();

  const onSubmit: SubmitHandler<BaserowCourseCreateInput> = (data) =>
    createCourseMutation.mutate(data);

  const createCourseMutation = useMutation({
    mutationFn: (data) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BASEROW_API_URL}database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_COURSE_TABLE_ID}/?user_field_names=true`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
          body: JSON.stringify(data),
        },
      )
        // .catch((e) => {
        //   console.log("fetch catch");
        //   throw e;
        // })
        .then(() => console.log("then")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourses"] });
    },
    onError: (error) => {
      console.log("not caught ?");
      console.log(error);
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 9</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 flex flex-col rounded border-2 border-indigo-500 p-8 text-left"
      >
        <label className="flex flex-col">
          <span>Nom de la formation</span>
          <input
            className="border-b-2 border-indigo-500"
            {...(register("name"), { required: true })}
          />
        </label>
        {/* {errors.name && <p className="text-red-500">This field is required</p>} TODO error parsing */}

        <label className="mt-12 flex flex-col">
          <span>Date de début de la formation</span>
          <input
            className="border-b-2 border-indigo-500"
            type="date"
            {...(register("start_date"), { required: true })}
          />
        </label>

        <input
          className="mx-auto mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
          type="submit"
        />
      </form>

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
