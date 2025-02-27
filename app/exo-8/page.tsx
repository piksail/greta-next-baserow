"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaserowCourse } from "@/types";
import Link from "next/link";
import { BaserowQueryResult } from "@/types/baserow";
import { useSessionStorage } from "@uidotdev/usehooks";

export default function Exo8() {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useSessionStorage("access_token", "");

  // TODO exo 9 formik ?
  // TODO exo 10 react-hook-forms ?

  const { isPending, error, data } = useQuery<
    BaserowQueryResult<BaserowCourse, false>
  >({
    queryKey: ["getCourses"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BASEROW_API_URL}database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_COURSE_TABLE_ID}/?user_field_names=true`,
        {
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
          },
        },
      ).then((res) => res.json()),
  });
  const courses = data?.results ?? [];

  const deleteCourseMutation = useMutation({
    mutationFn: (courseId: BaserowCourse["id"]) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BASEROW_API_URL}database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_COURSE_TABLE_ID}/${courseId}/?user_field_names=true`,
        {
          method: "DELETE",
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourses"] });
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 8</h1>
      <p>{data.count} results</p>
      <ul>
        {courses.map((course) => (
          <li
            key={course.id}
            className="my-7 rounded bg-indigo-500 p-8 text-xl text-white"
          >
            <dl className="">
              <div className="flex gap-2">
                <dt className="text-indigo-100">ID</dt>
                <dd className="italic">{course.id}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-indigo-100">Name</dt>
                <dd className="italic">{course.name}</dd>
              </div>
            </dl>
            <button
              className="mx-auto mt-12 inline-block w-fit cursor-pointer rounded bg-white px-4 py-2 text-2xl font-bold text-red-700"
              onClick={() => deleteCourseMutation.mutate(course.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
