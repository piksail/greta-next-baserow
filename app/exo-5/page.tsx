"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Exo5() {
  // Without useQuery, here would be the result
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         "https://base.piksail.com/api/database/rows/table/727/?user_field_names=true",
  //         {
  //           headers: {
  //             Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
  //           },
  //         },
  //       );
  //       const data = await response.json();
  //       setCourses(data.results);
  //     } catch (e) {
  //       console.error("ERROR");
  //     }
  //   }
  //   fetchData();
  // }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ["getCourses"],
    queryFn: () =>
      fetch(
        "https://base.piksail.com/api/database/rows/table/727/?user_field_names=true",
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
          },
        },
      ).then((res) => res.json()),
  });
  const courses = data?.results as { name: string; id: number }[];

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 5</h1>

      {isPending && <p className="mt-12 text-4xl">Chargement...</p>}

      {error && (
        <p className="mt-12 bg-red-600 text-2xl text-white">
          Une erreur est survenue : {error.message}
        </p>
      )}

      {data && (
        <div className="mt-12 flex flex-col gap-7 rounded bg-indigo-500 p-8 text-xl text-white">
          <p>{data.count} formations disponibles</p>
          <ul>
            {courses.map((course) => (
              <li key={course.id} className="my-7">
                <dl>
                  <div className="flex gap-2">
                    <dt className="text-indigo-100">ID</dt>
                    <dd className="italic">{course.id}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-indigo-100">Name</dt>
                    <dd className="italic">{course.name}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
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
