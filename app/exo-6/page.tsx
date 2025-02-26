"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetCourseTagsQuery, useGetCoursesQuery } from "@/lib/queries";
import { BaserowFilters, BaserowFiltersFilter } from "@/types/baserow";

export default function Exo6() {
  const titleSearchRef = useRef<HTMLInputElement>(null);
  const checkboxRefs = useRef<HTMLInputElement[]>([]);

  const getCourseTagsQuery = useGetCourseTagsQuery<false>({
    orderBy: "order_by=name",
  });
  const courseTags = getCourseTagsQuery.data?.results;

  const getCoursesQueryFilters = (tagFilters: BaserowFiltersFilter[]) => {
    const filters: BaserowFilters = {
      filter_type: "AND",
      filters: [
        { type: "boolean", field: "visible", value: "1" },
        {
          type: "date_is_on_or_after",
          field: "start_date",
          value: "Europe/Paris??today",
        },
        ...tagFilters,
      ],
      groups: [],
    };
    return filters;
  };

  const [filters, setFilters] = useState(getCoursesQueryFilters([]));
  const debouncedFilters = useDebounce(filters, 200);
  const getCoursesQuery = useGetCoursesQuery<false>({
    filters: debouncedFilters,
    size: "size=100",
    orderBy: "order_by=start_date",
  });
  const courses = getCoursesQuery.data?.results ?? [];

  const onFilterChange = () => {
    const filtersState = checkboxRefs.current.map((checkbox) => {
      return {
        value: checkbox.value,
        checked: checkbox.checked,
      };
    });
    const baserowTagFilters = filtersState
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => {
        return {
          type: "link_row_has",
          field: "tags",
          value: checkbox.value,
        };
      });
    const searchValue = titleSearchRef?.current?.value;
    if (searchValue) {
      baserowTagFilters.push({
        type: "contains",
        field: "title",
        value: searchValue,
      });
    }
    const filters = getCoursesQueryFilters(baserowTagFilters);
    setFilters(filters);
  };

  if (getCourseTagsQuery.isLoading) {
    return <p>Loading</p>;
  }

  if (getCourseTagsQuery.isError) {
    return <p>{getCourseTagsQuery.error.message}</p>;
  }

  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 6</h1>

      <div className="mt-12 flex flex-col gap-5 md:flex-row md:gap-10">
        <aside className="flex w-full flex-col-reverse gap-5 rounded bg-indigo-500 p-7 md:w-[25%] md:flex-col md:gap-10">
          <input
            ref={titleSearchRef}
            className="input rounded bg-white p-4 shadow"
            placeholder="Rechercher par titre"
            onChange={onFilterChange}
          />
          <div className="flex flex-col items-start rounded bg-white p-4 shadow">
            {courseTags?.map((tag, index) => {
              return (
                <label key={tag.id}>
                  <input
                    // @ts-expect-error Is not null
                    ref={(el) => (checkboxRefs.current[index] = el)}
                    type="checkbox"
                    className="mr-1"
                    value={tag.id}
                    onChange={onFilterChange}
                  />
                  <span>{tag.name}</span>
                </label>
              );
            })}
          </div>
        </aside>
        <div className="flex-1">
          {!!courses?.length && (
            <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
              {courses.map((course) => {
                return (
                  <li key={course.id}>
                    <div
                      className={`flex h-full flex-col border-[1px] border-transparent ${course.category.value === "design" ? "bg-fir-300 text-fir-950" : "bg-clay-300"} rounded p-4`}
                    >
                      <h4 className="text-4xl">{course.name}</h4>
                      <time>{course.start_date}</time>
                      <div>{course.category.value}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
