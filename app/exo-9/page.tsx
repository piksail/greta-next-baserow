"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSessionStorage } from "@uidotdev/usehooks";
import Link from "next/link";
import axios from "@/lib/axios";
import { useGetCourseTagsQuery } from "@/lib/queries";

export default function Exo9() {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useSessionStorage("access_token", "");

  type CreateCourseInput = {
    name: string;
    start_date: string;
    tags: string[] | number[];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseInput>();

  const onSubmit: SubmitHandler<CreateCourseInput> = (data) => {
    return createCourseMutation.mutate(data);
  };

  const getCourseTagsQuery = useGetCourseTagsQuery<false>({
    orderBy: "order_by=name",
  });
  const courseTags = getCourseTagsQuery.data?.results ?? [];

  const createCourseMutation = useMutation({
    mutationFn: (data: CreateCourseInput) => {
      return axios.post(
        `database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_COURSE_TABLE_ID}/?user_field_names=true`,
        data,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourses"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (getCourseTagsQuery.isLoading) return <p>Chargement...</p>;

  if (getCourseTagsQuery.isError) return <p>Erreur</p>;

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 9</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 flex flex-col rounded border-2 border-indigo-500 p-8 text-left"
      >
        <div>
          <label className="flex flex-col">
            <span className="italic">Nom de la formation</span>
            <input
              className="border-b-2 border-indigo-500"
              {...register("name", { required: true })}
            />
          </label>
          {errors.name && (
            <p className="text-red-500">Valeur incorrecte</p>
          )}{" "}
        </div>

        <div className="mt-12">
          <span className="italic">Tags</span>
          {courseTags.map((tag) => (
            <label key={tag.id} className="flex flex-row gap-2">
              <input type="checkbox" value={tag.name} {...register("tags")} />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="mt-12 flex flex-col">
            <span className="italic">Date de début de la formation</span>
            <input
              className="border-b-2 border-indigo-500"
              type="date"
              {...register("start_date", { required: true })}
            />
          </label>
          {errors.start_date && (
            <p className="text-red-500">Valeur incorrecte</p>
          )}{" "}
        </div>
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
