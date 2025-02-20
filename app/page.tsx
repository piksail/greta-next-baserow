"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/contexts";
import Link from "next/link";

export default function Home() {
  const { currentRegistration } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://base.piksail.com/api/database/rows/table/727/?user_field_names=true",
          {
            headers: {
              Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_PUBLIC_API_TOKEN}`,
            },
          },
        );
        const data = await response.json();
        setCourses(data.results);
        console.log("yoyo", data);
      } catch (e) {
        console.error("ERROR");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="">
      <header className="h-screen p-7 text-center">
        <nav></nav>

        <h1 className="font-display mt-12 text-8xl">Homepage</h1>
        <p className="text-3xl">{courses.length} courses</p>
        {currentRegistration ? (
          <p>1 current registration</p>
        ) : (
          <p>No current registration</p>
        )}
        <Link
          href="/courses"
          className="bg-hydrangea-300 text-hydrangea-950 mt-12 inline-flex rounded-xl px-6 py-3 font-semibold"
        >
          Go to courses
        </Link>
      </header>
      {/* <main className="">
        <ul>
          {courses.filter((course) => course.category.value === currentUser.preferredCategory).map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      </main> */}
      <footer></footer>
    </div>
  );
}
