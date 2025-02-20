"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetCourseTagsQuery, useGetCoursesQuery } from "@/lib/queries";
import { BaserowFilters, BaserowFiltersFilter } from "@/types/baserow";
import CourseCard from "@/components/course-card";

export default function Courses() {
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
        <section className="p-8">
          <div className="pageSection flex flex-col md:flex-row gap-5 md:gap-10">
            <aside className="w-full md:w-[25%] flex flex-col-reverse md:flex-col gap-5 md:gap-10">
              <input
                ref={titleSearchRef}
                className="input border-[1px] border-clay-200 rounded shadow p-4 text-sm"
                placeholder="Rechercher par titre"
                onChange={onFilterChange}
              />
              <div className="border-[1px] border-clay-200 rounded shadow p-4 text-sm flex flex-col">
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
              <div className="border-[1px] border-clay-200 rounded shadow p-4 text-sm">
                <Link href="/" className="bg-hydrangea-300 text-hydrangea-950 font-semibold py-3 px-6 rounded-xl inline-flex mt-12">Home</Link>
              </div>
            </aside>
            <div className=" flex-1">
              {!!courses?.length && (
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
                  {courses.map((course) => {
                    return (
                      <li key={course.id} className="*:h-full ">
                        <CourseCard course={course} />
                        {/* TODO reprendre ici faire un composant course card PUIS faire une page inscrire qqn et faire un state machine */}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </section>
  );
}
