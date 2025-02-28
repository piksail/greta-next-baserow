"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionStorage } from "@uidotdev/usehooks";
import Link from "next/link";
import axios from "@/lib/axios";
import { useGetCoursesQuery, useGetCourseTagsQuery } from "@/lib/queries";
import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useState } from "react";

export default function Exo10() {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useSessionStorage("access_token", "");

  type UpdateCourseInput = {
    name: string;
    start_date: string;
    tags: string[] | number[];
  };

  const getCoursesQuery = useGetCoursesQuery<false>();
  const courses = getCoursesQuery.data?.results ?? [];
  const [selectedCourseId, setSelectedCourseId] = useState<
    number | undefined
  >();
  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId,
  );

  const getCourseTagsQuery = useGetCourseTagsQuery<false>({
    orderBy: "order_by=name",
  });
  const courseTags = getCourseTagsQuery.data?.results ?? [];

  useEffect(() => {
    if (courses?.length) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses]);

  const updateCourseMutation = useMutation({
    mutationFn: (data: UpdateCourseInput) => {
      return axios.patch(
        `database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_COURSE_TABLE_ID}/${selectedCourseId}/?user_field_names=true`,
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

  if (getCoursesQuery.isLoading || getCourseTagsQuery.isLoading)
    return <p>Chargement...</p>;

  if (getCoursesQuery.isError || getCourseTagsQuery.isError)
    return <p>Erreur</p>;

  if (!selectedCourse) return <p>Chargement...</p>;

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 10</h1>

      <select
        className="mx-auto mt-12 flex cursor-pointer flex-col rounded border-2 border-indigo-500 p-2"
        onChange={(event) =>
          setSelectedCourseId(Number.parseInt(event.target.value))
        }
      >
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      <Formik
        initialValues={{
          name: selectedCourse.name,
          start_date: selectedCourse.start_date,
          tags: selectedCourse.tags.map((tag) => tag.value),
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          updateCourseMutation.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 flex flex-col rounded border-2 border-indigo-500 p-8 text-left"
          >
            <div>
              <label className="flex flex-col">
                <span className="italic">Nom de la formation</span>
                <Field
                  className="border-b-2 border-indigo-500"
                  type="name"
                  name="name"
                  required
                />
              </label>
              <ErrorMessage name="name" component="p" />
            </div>

            <div className="mt-12">
              <span className="italic">Tags</span>
              {courseTags.map((tag) => (
                <label key={tag.id} className="flex flex-row gap-2">
                  <Field type="checkbox" name="tags" value={tag.name} />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="mt-12 flex flex-col">
                <span className="italic">Date de début de la formation</span>
                <Field
                  className="border-b-2 border-indigo-500"
                  type="date"
                  name="start_date"
                  required
                />
              </label>
              <ErrorMessage name="start_date" component="p" />
            </div>
            <button
              className="mx-auto mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
              type="submit"
              disabled={isSubmitting}
            >
              Valider
            </button>
          </form>
        )}
      </Formik>

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
